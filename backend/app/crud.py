from sqlalchemy.orm import Session
from models import (
    Application, ApplicantInfo, Narrative, PlannedContribution, Feedback,
    Event, GrantProject, PartnershipProject,
    Publication, PhDStudent, Award, PressAppearance
)
from utils import generate_application_id

def save_application(db, app_id, data):
    # Root tables (UPSERT)
    db.merge(Application(application_id=app_id))
    db.merge(ApplicantInfo(application_id=app_id, **data["applicant"]))
    db.merge(Narrative(application_id=app_id, narrative=data["narrative"]))
    db.merge(PlannedContribution(application_id=app_id, planned_text=data["planned"]))
    db.merge(Feedback(application_id=app_id, **data.get("feedback", {})))

    # Dynamic panels (DELETE + INSERT)
    TABLES = [
        Event, GrantProject, PartnershipProject,
        Publication, PhDStudent, Award, PressAppearance
    ]

    for table in TABLES:
        db.query(table).filter(table.application_id == app_id).delete()

    for ev in data.get("events", []):
        db.add(Event(application_id=app_id, **ev))

    for g in data.get("grants", []):
        db.add(GrantProject(application_id=app_id, **g))

    for p in data.get("partnerships", []):
        db.add(PartnershipProject(application_id=app_id, **p))

    for pub in data.get("publications", []):
        db.add(Publication(application_id=app_id, **pub))

    for phd in data.get("phd_students", []):
        db.add(PhDStudent(application_id=app_id, **phd))

    for a in data.get("awards", []):
        db.add(Award(application_id=app_id, **a))

    for press in data.get("press", []):
        db.add(PressAppearance(application_id=app_id, **press))

    db.commit()

def update_application(db: Session, app_id: str, data):
    pass
