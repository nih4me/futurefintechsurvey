from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import ApplicationSurveySchema
from models import (
    Application, ApplicantInfo, Narrative, PlannedContribution, Feedback,
    Event, GrantProject, PartnershipProject,
    Publication, PhDStudent, Award, PressAppearance
)
from utils import generate_application_id

router = APIRouter(prefix="/api/applications", tags=["applications"])

def populate(db, application_id, payload):
    for ev in payload.events:
        db.add(Event(application_id=application_id, **ev.dict()))

    for g in payload.grants:
        db.add(GrantProject(application_id=application_id, **g.dict()))

    for p in payload.partnerships:
        db.add(PartnershipProject(application_id=application_id, **p.dict()))

    for pub in payload.publications:
        db.add(Publication(application_id=application_id, **pub.dict()))

    for phd in payload.phd_students:
        db.add(PhDStudent(application_id=application_id, **phd.dict()))

    for a in payload.awards:
        db.add(Award(application_id=application_id, **a.dict()))

    for pr in payload.press:
        db.add(PressAppearance(application_id=application_id, **pr.dict()))

    return db

# ----------------------------
# CREATE
# ----------------------------

@router.post("/", status_code=201)
def create_application(payload: ApplicationSurveySchema, status: str = "submitted", db: Session = Depends(get_db)):
    application_id = generate_application_id()

    try:
        db.add(Application(application_id=application_id, status=status))

        db.add(ApplicantInfo(application_id=application_id, **payload.applicant.dict()))
        db.add(Narrative(application_id=application_id, narrative=payload.narrative))
        db.add(PlannedContribution(
            application_id=application_id,
            planned_text=payload.planned_contributions
        ))

        if payload.form_intuitive or payload.form_easy or payload.suggestions:
            db.add(Feedback(
                application_id=application_id,
                form_intuitive=payload.form_intuitive,
                form_easy=payload.form_easy,
                suggestions=payload.suggestions
            ))

        db = populate(db, application_id, payload)

        db.commit()

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return {
        "application_id": application_id,
        "edit_url": f"/edit?app={application_id}"
    }


# ----------------------------
# LOAD (FOR EDITING)
# ----------------------------

@router.get("/{application_id}", response_model=ApplicationSurveySchema)
def load_application(application_id: str, db: Session = Depends(get_db)):
    app = db.query(Application).filter_by(application_id=application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    applicant = db.query(ApplicantInfo).get(application_id)
    narrative = db.query(Narrative).get(application_id)
    planned = db.query(PlannedContribution).get(application_id)
    feedback = db.query(Feedback).get(application_id)

    return {
        "applicant": applicant,
        "narrative": narrative.narrative if narrative else "",
        "events": db.query(Event).filter_by(application_id=application_id).all(),
        "grants": db.query(GrantProject).filter_by(application_id=application_id).all(),
        "partnerships": db.query(PartnershipProject).filter_by(application_id=application_id).all(),
        "publications": db.query(Publication).filter_by(application_id=application_id).all(),
        "phd_students": db.query(PhDStudent).filter_by(application_id=application_id).all(),
        "awards": db.query(Award).filter_by(application_id=application_id).all(),
        "press": db.query(PressAppearance).filter_by(application_id=application_id).all(),
        "planned_contributions": planned.planned_text if planned else "",
        "form_intuitive": feedback.form_intuitive if feedback else None,
        "form_easy": feedback.form_easy if feedback else None,
        "suggestions": feedback.suggestions if feedback else None
    }


# ----------------------------
# UPDATE
# ----------------------------

@router.put("/{application_id}")
def update_application(
    application_id: str,
    payload: ApplicationSurveySchema,
    db: Session = Depends(get_db)
):
    if not db.query(Application).filter_by(application_id=application_id).first():
        raise HTTPException(status_code=404, detail="Application not found")

    try:
        # UPSERT root tables
        db.merge(ApplicantInfo(application_id=application_id, **payload.applicant.dict()))
        db.merge(Narrative(application_id=application_id, narrative=payload.narrative))
        db.merge(PlannedContribution(
            application_id=application_id,
            planned_text=payload.planned_contributions
        ))
        db.merge(Feedback(
            application_id=application_id,
            form_intuitive=payload.form_intuitive,
            form_easy=payload.form_easy,
            suggestions=payload.suggestions
        ))

        # DELETE + INSERT dynamic panels
        for table in [
            Event, GrantProject, PartnershipProject,
            Publication, PhDStudent, Award, PressAppearance
        ]:
            db.query(table).filter_by(application_id=application_id).delete()

        db = populate(db, application_id, payload)

        db.commit()

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return {"status": "updated"}
