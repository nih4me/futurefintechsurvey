from sqlalchemy.orm import Session
from models import (
    Submission, ContributorInfo, Narrative, PlannedContribution, Feedback,
    Event, GrantProject, PartnershipProject,
    Publication, PhDStudent, Award, PressAppearance
)
from utils import generate_submission_id

def save_submission(db, app_id, data):
    # Root tables (UPSERT)
    db.merge(Submission(submission_id=app_id))
    db.merge(ContributorInfo(submission_id=app_id, **data["contributor"]))
    db.merge(Narrative(submission_id=app_id, narrative=data["narrative"]))
    db.merge(PlannedContribution(submission_id=app_id, planned_text=data["planned"]))
    db.merge(Feedback(submission_id=app_id, **data.get("feedback", {})))

    # Dynamic panels (DELETE + INSERT)
    TABLES = [
        Event, GrantProject, PartnershipProject,
        Publication, PhDStudent, Award, PressAppearance
    ]

    for table in TABLES:
        db.query(table).filter(table.submission_id == app_id).delete()

    for ev in data.get("events", []):
        db.add(Event(submission_id=app_id, **ev))

    for g in data.get("grants", []):
        db.add(GrantProject(submission_id=app_id, **g))

    for p in data.get("partnerships", []):
        db.add(PartnershipProject(submission_id=app_id, **p))

    for pub in data.get("publications", []):
        db.add(Publication(submission_id=app_id, **pub))

    for phd in data.get("phd_students", []):
        db.add(PhDStudent(submission_id=app_id, **phd))

    for a in data.get("awards", []):
        db.add(Award(submission_id=app_id, **a))

    for press in data.get("press", []):
        db.add(PressAppearance(submission_id=app_id, **press))

    db.commit()

def update_submission(db: Session, app_id: str, data):
    pass
