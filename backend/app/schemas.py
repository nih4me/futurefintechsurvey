from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date

# ----------------------------
# Contributor Information
# ----------------------------

class ContributorInfoSchema(BaseModel):
    email: EmailStr
    name: str
    surname: str
    contributor_type: str
    affiliated_fellow_email: Optional[EmailStr] = None
    discipline: str
    events_na: Optional[bool] = False
    grants_na: Optional[bool] = False
    publications_na: Optional[bool] = False
    awards_na: Optional[bool] = False
    partnerships_na: Optional[bool] = False
    phd_students_na: Optional[bool] = False
    press_na: Optional[bool] = False

# ----------------------------
# Dynamic Panels
# ----------------------------

class EventSchema(BaseModel):
    event_date: Optional[date] = None
    event_name: Optional[str] = None
    event_type: Optional[str] = None
    location: Optional[str] = None
    role: Optional[str] = None


class GrantProjectSchema(BaseModel):
    project_name: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    funder: Optional[str] = None
    funding_programme: Optional[str] = None
    mixed_gender: Optional[bool] = False
    mixed_team: Optional[bool] = False


class PartnershipProjectSchema(BaseModel):
    project_name: Optional[str] = None
    start_date: Optional[date] = None
    partnership_type: Optional[str] = None
    partner: Optional[str] = None
    acquired_funding: Optional[float] = None


class PublicationSchema(BaseModel):
    publication_date: Optional[date] = None
    publication_name: Optional[str] = None
    orbilu_link: Optional[str] = None
    mixed_gender: Optional[bool] = False
    mixed_team: Optional[bool] = False


class PhDStudentSchema(BaseModel):
    graduation_date: Optional[date] = None
    student_name: Optional[str] = None
    thesis_title: Optional[str] = None
    career_pursued: Optional[str] = None
    current_work_location: Optional[str] = None


class AwardSchema(BaseModel):
    award_date: Optional[date] = None
    award_title: Optional[str] = None
    award_subject: Optional[str] = None
    award_issuer: Optional[str] = None


class PressAppearanceSchema(BaseModel):
    appearance_date: Optional[date] = None
    press_name: Optional[str] = None
    press_type: Optional[str] = None
    appearance_type: Optional[str] = None
    subject: Optional[str] = None


# ----------------------------
# Survey Root Payload
# ----------------------------

class SubmissionSurveySchema(BaseModel):
    # Contributor
    contributor: ContributorInfoSchema

    # Narrative
    narrative: str = Field(..., max_length=250)

    # Dynamic panels
    events: List[EventSchema] = []
    grants: List[GrantProjectSchema] = []
    partnerships: List[PartnershipProjectSchema] = []
    publications: List[PublicationSchema] = []
    phd_students: List[PhDStudentSchema] = []
    awards: List[AwardSchema] = []
    press: List[PressAppearanceSchema] = []

    # Planned contributions
    planned_contributions: str = Field(..., max_length=150)

    # Feedback
    form_intuitive: Optional[int] = None
    form_easy: Optional[int] = None
    suggestions: Optional[str] = None

    class Config:
        from_attributes = True
