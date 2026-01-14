from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from io import BytesIO
from openpyxl import Workbook

from database import get_db
from models import (
    Application,
    ApplicantInfo,
    Event,
    Publication,
    GrantProject,
    Award,
    PhDStudent,
    PressAppearance,
    PartnershipProject,
    Feedback,
    PlannedContribution
)
from utils import autosize_columns

router = APIRouter(prefix="/export", tags=["Export"])

def write_table_sheet(wb, title, columns, rows):
    ws = wb.create_sheet(title=title)
    ws.append(columns)

    for row in rows:
        ws.append([getattr(row, col) for col in columns])

    autosize_columns(ws)

def write_applicants_sheet(wb, db: Session):
    ws = wb.create_sheet(title="Applicants")

    headers = [
        "application_id",
        "created_at",
        "updated_at",
        "status",
        "email",
        "name",
        "surname",
        "applicant_type",
        "affiliated_fellow_email",
        "discipline",
        "events_na",
        "grants_na",
        "publications_na",
        "awards_na",
        "partnerships_na",
        "phd_students_na",
        "press_na",
    ]

    ws.append(headers)

    rows = (
        db.query(Application, ApplicantInfo)
        .join(ApplicantInfo, ApplicantInfo.application_id == Application.application_id)
        .all()
    )

    for app, applicant in rows:
        ws.append([
            app.application_id,
            app.created_at,
            app.updated_at,
            app.status,
            applicant.email,
            applicant.name,
            applicant.surname,
            applicant.applicant_type,
            applicant.affiliated_fellow_email,
            applicant.discipline,
            applicant.events_na,
            applicant.grants_na,
            applicant.publications_na,
            applicant.awards_na,
            applicant.partnerships_na,
            applicant.phd_students_na,
            applicant.press_na,
        ])

    autosize_columns(ws)

@router.get("/applications.xlsx")
def export_applications(db: Session = Depends(get_db)):
    wb = Workbook()
    wb.remove(wb.active)  # remove default empty sheet

    # Applicants (custom)
    write_applicants_sheet(wb, db)

    # Generic sheets
    write_table_sheet(
        wb,
        "Events",
        ["application_id", "event_date", "event_name", "event_type", "location", "role"],
        db.query(Event).all()
    )

    write_table_sheet(
        wb,
        "Publications",
        ["application_id", "publication_name", "publication_date", "orbilu_link", "mixed_gender", "mixed_team"],
        db.query(Publication).all()
    )

    write_table_sheet(
        wb,
        "Grants",
        ["application_id", "project_name", "funder", "funding_programme", "start_date", "end_date", "mixed_gender", "mixed_team"],
        db.query(GrantProject).all()
    )

    write_table_sheet(
        wb,
        "Awards",
        ["application_id", "award_date", "award_title", "award_subject", "award_issuer"],
        db.query(Award).all()
    )

    write_table_sheet(
        wb,
        "PhD Students",
        ["application_id", "graduation_date", "student_name", "thesis_title",
         "career_pursued", "current_work_location"],
        db.query(PhDStudent).all()
    )

    write_table_sheet(
        wb,
        "Press",
        ["application_id", "appearance_date", "press_name", "press_type",
         "appearance_type", "subject"],
        db.query(PressAppearance).all()
    )

    write_table_sheet(
        wb,
        "Partnerships",
        ["application_id", "project_name", "start_date",
         "partnership_type", "partner", "acquired_funding"],
        db.query(PartnershipProject).all()
    )

    # Stream file
    output = BytesIO()
    wb.save(output)
    output.seek(0)

    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition": "attachment; filename=applications_export.xlsx"
        }
    )
