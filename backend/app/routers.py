from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import SubmissionSurveySchema
from models import (
    Submission, ContributorInfo, Narrative, PlannedContribution, Feedback,
    Event, GrantProject, PartnershipProject,
    Publication, PhDStudent, Award, PressAppearance
)
from utils import generate_submission_id

router = APIRouter(prefix="/api/submissions", tags=["submissions"])

def populate(db, submission_id, payload):
    for ev in payload.events:
        db.add(Event(submission_id=submission_id, **ev.dict()))

    for g in payload.grants:
        db.add(GrantProject(submission_id=submission_id, **g.dict()))

    for p in payload.partnerships:
        db.add(PartnershipProject(submission_id=submission_id, **p.dict()))

    for pub in payload.publications:
        db.add(Publication(submission_id=submission_id, **pub.dict()))

    for phd in payload.phd_students:
        db.add(PhDStudent(submission_id=submission_id, **phd.dict()))

    for a in payload.awards:
        db.add(Award(submission_id=submission_id, **a.dict()))

    for pr in payload.press:
        db.add(PressAppearance(submission_id=submission_id, **pr.dict()))

    return db

# ----------------------------
# CREATE
# ----------------------------

@router.post("/", status_code=201)
def create_submission(payload: SubmissionSurveySchema, status: str = "submitted", db: Session = Depends(get_db)):
    submission_id = generate_submission_id()

    try:
        db.add(Submission(submission_id=submission_id, status=status))

        db.add(ContributorInfo(submission_id=submission_id, **payload.contributor.dict()))
        db.add(Narrative(submission_id=submission_id, narrative=payload.narrative))
        db.add(PlannedContribution(
            submission_id=submission_id,
            planned_text=payload.planned_contributions
        ))

        if payload.form_intuitive or payload.form_easy or payload.suggestions:
            db.add(Feedback(
                submission_id=submission_id,
                form_intuitive=payload.form_intuitive,
                form_easy=payload.form_easy,
                suggestions=payload.suggestions
            ))

        db = populate(db, submission_id, payload)

        db.commit()

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return {
        "submission_id": submission_id,
        "edit_url": f"/edit?app={submission_id}"
    }


# ----------------------------
# LOAD (FOR EDITING)
# ----------------------------

@router.get("/{submission_id}", response_model=SubmissionSurveySchema)
def load_submission(submission_id: str, db: Session = Depends(get_db)):
    app = db.query(Submission).filter_by(submission_id=submission_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Submission not found")

    contributor = db.query(ContributorInfo).get(submission_id)
    narrative = db.query(Narrative).get(submission_id)
    planned = db.query(PlannedContribution).get(submission_id)
    feedback = db.query(Feedback).get(submission_id)

    return {
        "contributor": contributor,
        "narrative": narrative.narrative if narrative else "",
        "events": db.query(Event).filter_by(submission_id=submission_id).all(),
        "grants": db.query(GrantProject).filter_by(submission_id=submission_id).all(),
        "partnerships": db.query(PartnershipProject).filter_by(submission_id=submission_id).all(),
        "publications": db.query(Publication).filter_by(submission_id=submission_id).all(),
        "phd_students": db.query(PhDStudent).filter_by(submission_id=submission_id).all(),
        "awards": db.query(Award).filter_by(submission_id=submission_id).all(),
        "press": db.query(PressAppearance).filter_by(submission_id=submission_id).all(),
        "planned_contributions": planned.planned_text if planned else "",
        "form_intuitive": feedback.form_intuitive if feedback else None,
        "form_easy": feedback.form_easy if feedback else None,
        "suggestions": feedback.suggestions if feedback else None
    }


# ----------------------------
# UPDATE
# ----------------------------

@router.put("/{submission_id}")
def update_submission(
    submission_id: str,
    payload: SubmissionSurveySchema,
    db: Session = Depends(get_db)
):
    if not db.query(Submission).filter_by(submission_id=submission_id).first():
        raise HTTPException(status_code=404, detail="Submission not found")

    try:
        # UPSERT root tables
        db.merge(ContributorInfo(submission_id=submission_id, **payload.contributor.dict()))
        db.merge(Narrative(submission_id=submission_id, narrative=payload.narrative))
        db.merge(PlannedContribution(
            submission_id=submission_id,
            planned_text=payload.planned_contributions
        ))
        db.merge(Feedback(
            submission_id=submission_id,
            form_intuitive=payload.form_intuitive,
            form_easy=payload.form_easy,
            suggestions=payload.suggestions
        ))

        # DELETE + INSERT dynamic panels
        for table in [
            Event, GrantProject, PartnershipProject,
            Publication, PhDStudent, Award, PressAppearance
        ]:
            db.query(table).filter_by(submission_id=submission_id).delete()

        db = populate(db, submission_id, payload)

        db.commit()

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return {"status": "updated"}
