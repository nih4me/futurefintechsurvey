from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from io import BytesIO
from openpyxl import Workbook

from typing import Optional

from database import get_db
from models import (
    Submission,
    ContributorInfo,
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

def write_contributors_sheet(wb, db: Session):
    ws = wb.create_sheet(title="Contributors")

    headers = [
        "submission_id",
        "created_at",
        "updated_at",
        "status",
        "email",
        "name",
        "surname",
        "contributor_type",
        "affiliated_fellow_email",
        "discipline",
        "has_events",
        "has_new_fundings",
        "has_publications",
        "has_awards",
        "has_partnerships",
        "has_phd_students",
        "has_press",
    ]

    ws.append(headers)

    rows = (
        db.query(Submission, ContributorInfo)
        .join(ContributorInfo, ContributorInfo.submission_id == Submission.submission_id)
        .all()
    )

    for app, contributor in rows:
        ws.append([
            app.submission_id,
            app.created_at,
            app.updated_at,
            app.status,
            contributor.email,
            contributor.name,
            contributor.surname,
            contributor.contributor_type,
            contributor.affiliated_fellow_email,
            contributor.discipline,
            contributor.has_events,
            contributor.has_new_fundings,
            contributor.has_publications,
            contributor.has_awards,
            contributor.has_partnerships,
            contributor.has_phd_students,
            contributor.has_press,
        ])

    autosize_columns(ws)

@router.get("/submissions.xlsx")
def export_submissions(db: Session = Depends(get_db)):
    wb = Workbook()
    wb.remove(wb.active)  # remove default empty sheet

    # Contributors (custom)
    write_contributors_sheet(wb, db)

    def get_rows(query, submission_id: Optional[int] = None):
        if submission_id is not None:
            query = query.filter_by(submission_id=submission_id)
        return query.all()

    # Generic sheets
    write_table_sheet(
        wb,
        "Events",
        ["submission_id", "event_date", "event_name", "event_type", "location", "role", "roleComment"],
        get_rows(db.query(Event))
    )

    write_table_sheet(
        wb,
        "Publications",
        ["submission_id", "publication_name", "publication_date", "orbilu_link", "mixed_gender", "mixed_team"],
        get_rows(db.query(Publication))
    )

    write_table_sheet(
        wb,
        "Grants",
        ["submission_id", "project_name", "funder", "funderComment", "role", "roleComment", "funding_programme", "start_date", "end_date", "mixed_gender", "mixed_team"],
        get_rows(db.query(GrantProject))
    )

    write_table_sheet(
        wb,
        "Awards",
        ["submission_id", "award_date", "award_title", "award_subject", "award_issuer"],
        get_rows(db.query(Award))
    )

    write_table_sheet(
        wb,
        "PhD Students",
        ["submission_id", "graduation_year", "student_name", "thesis_title",
         "career_pursued", "current_work_location"],
        get_rows(db.query(PhDStudent))
    )

    write_table_sheet(
        wb,
        "Press",
        ["submission_id", "appearance_date", "press_name", "press_type",
         "appearance_type", "subject"],
        get_rows(db.query(PressAppearance))
    )

    write_table_sheet(
        wb,
        "Partnerships",
        ["submission_id", "project_name", "start_date",
         "partnership_type", "role", "roleComment", "partner", "acquired_funding"],
        get_rows(db.query(PartnershipProject))
    )

    # Stream file
    output = BytesIO()
    wb.save(output)
    output.seek(0)

    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition": "attachment; filename=submissions_export.xlsx"
        }
    )
