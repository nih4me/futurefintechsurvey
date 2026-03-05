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

    headers = [label for field, label in columns]
    ws.append(headers)

    for row in rows:
        ws.append([getattr(row, field) for field, label in columns])

    autosize_columns(ws)

def write_contributors_sheet(wb, db: Session, submission_id=None):
    ws = wb.create_sheet(title="Contributors")

    columns = [
        ("submission_id", "Submission ID"),
        ("created_at", "Created At"),
        ("updated_at", "Updated At"),
        ("status", "Submission Status"),
        ("consent", "Consent Given"),
        ("email", "Email"),
        ("name", "First Name"),
        ("surname", "Last Name"),
        ("contributor_type", "Contributor Type"),
        ("affiliated_fellow_email", "Affiliated Fellow Email"),
        ("discipline", "Discipline"),
        ("has_events", "Has Events"),
        ("has_new_fundings", "Has New Fundings"),
        ("has_publications", "Has Publications"),
        ("all_publications_on_orbilu", "All Publications on ORBiLu"),
        ("has_awards", "Has Awards"),
        ("has_partnerships", "Has Partnerships"),
        ("has_phd_students", "Has PhD Students"),
        ("has_press", "Has Press Appearances"),
    ]

    ws.append([label for field, label in columns])

    query = (
        db.query(Submission, ContributorInfo)
        .join(
            ContributorInfo,
            ContributorInfo.submission_id == Submission.submission_id
        )
    )
    if submission_id is not None:
        query = query.filter(Submission.submission_id == submission_id)
    rows = query.all()

    for app, contributor in rows:
        data = {
            "submission_id": app.submission_id,
            "created_at": app.created_at,
            "updated_at": app.updated_at,
            "status": app.status,
            "consent": contributor.consent,
            "email": contributor.email,
            "name": contributor.name,
            "surname": contributor.surname,
            "contributor_type": contributor.contributor_type,
            "affiliated_fellow_email": contributor.affiliated_fellow_email,
            "discipline": contributor.discipline,
            "has_events": contributor.has_events,
            "has_new_fundings": contributor.has_new_fundings,
            "has_publications": contributor.has_publications,
            "all_publications_on_orbilu": contributor.all_publications_on_orbilu,
            "has_awards": contributor.has_awards,
            "has_partnerships": contributor.has_partnerships,
            "has_phd_students": contributor.has_phd_students,
            "has_press": contributor.has_press,
        }
        ws.append([data[field] for field, label in columns])

    autosize_columns(ws)

@router.get("/")
def export_submissions(submission_id: Optional[str] = None, db: Session = Depends(get_db)):
    wb = Workbook()
    wb.remove(wb.active)  # remove default empty sheet

    # Contributors (custom)
    write_contributors_sheet(wb, db, submission_id)

    def get_rows(query, submission_id: Optional[str] = None):
        if submission_id is not None:
           query = query.filter_by(submission_id=submission_id)
        rows = query.all()
        return rows

    # Generic sheets
    write_table_sheet(
        wb,
        "Events",
        [
            ("submission_id", "Submission ID"),
            ("event_date", "Event Date"),
            ("event_name", "Event Name"),
            ("event_type", "Event Type"),
            ("location", "Location"),
            ("role", "Role"),
            ("roleComment", "Role Comment"),
        ],
        get_rows(db.query(Event), submission_id)
    )

    write_table_sheet(
        wb,
        "Publications",
        [
            ("submission_id", "Submission ID"),
            ("publication_name", "Publication Name"),
            ("publication_date", "Publication Date"),
            ("orbilu_link", "ORBiLu Link"),
            ("mixed_gender", "Mixed Gender Team"),
            ("mixed_team", "Mixed Team"),
        ],
        get_rows(db.query(Publication), submission_id)
    )

    write_table_sheet(
        wb,
        "Grants",
        [
            ("submission_id", "Submission ID"),
            ("project_name", "Project Name"),
            ("funder", "Funder"),
            ("funderComment", "Funder Comment"),
            ("role", "Role"),
            ("roleComment", "Role Comment"),
            ("funding_programme", "Funding Programme"),
            ("start_date", "Start Date"),
            ("end_date", "End Date"),
            ("mixed_gender", "Mixed Gender Team"),
            ("mixed_team", "Mixed Team"),
        ],
        get_rows(db.query(GrantProject), submission_id)
    )

    write_table_sheet(
        wb,
        "Awards",
        [
            ("submission_id", "Submission ID"),
            ("award_date", "Award Date"),
            ("award_title", "Award Title"),
            ("award_subject", "Award Subject"),
            ("award_issuer", "Award Issuer"),
        ],
        get_rows(db.query(Award), submission_id)
    )

    write_table_sheet(
        wb,
        "PhD Students",
        [
            ("submission_id", "Submission ID"),
            ("graduation_year", "Graduation Year"),
            ("student_name", "Student Name"),
            ("thesis_title", "Thesis Title"),
            ("career_pursued", "Career Pursued"),
            ("current_work_location", "Current Work Location"),
        ],
        get_rows(db.query(PhDStudent), submission_id)
    )

    write_table_sheet(
        wb,
        "Press",
        [
            ("submission_id", "Submission ID"),
            ("appearance_date", "Appearance Date"),
            ("press_name", "Press Name"),
            ("press_type", "Press Type"),
            ("appearance_type", "Appearance Type"),
            ("subject", "Subject"),
        ],
        get_rows(db.query(PressAppearance), submission_id)
    )

    write_table_sheet(
        wb,
        "Partnerships",
        [
            ("submission_id", "Submission ID"),
            ("project_name", "Project Name"),
            ("start_date", "Start Date"),
            ("partnership_type", "Partnership Type"),
            ("role", "Role"),
            ("roleComment", "Role Comment"),
            ("partner", "Partner"),
            ("acquired_funding", "Acquired Funding"),
        ],
        get_rows(db.query(PartnershipProject), submission_id)
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
