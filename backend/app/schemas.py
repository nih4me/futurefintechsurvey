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
    has_events: Optional[bool] = False
    has_new_fundings: Optional[bool] = False
    has_publications: Optional[bool] = False
    has_awards: Optional[bool] = False
    has_partnerships: Optional[bool] = False
    has_phd_students: Optional[bool] = False
    has_press: Optional[bool] = False

# ----------------------------
# Dynamic Panels
# ----------------------------

class EventSchema(BaseModel):
    event_date: Optional[date] = None
    event_name: Optional[str] = None
    event_type: Optional[str] = None
    location: Optional[str] = None
    role: Optional[str] = None
    roleComment: Optional[str] = None


class GrantProjectSchema(BaseModel):
    project_name: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    funder: Optional[str] = None
    funderComment: Optional[str] = None
    funding_programme: Optional[str] = None
    role: Optional[str] = None
    roleComment: Optional[str] = None
    mixed_gender: Optional[bool] = False
    mixed_team: Optional[bool] = False


class PartnershipProjectSchema(BaseModel):
    project_name: Optional[str] = None
    start_date: Optional[date] = None
    partnership_type: Optional[str] = None
    partner: Optional[str] = None
    role: Optional[str] = None
    roleComment: Optional[str] = None
    acquired_funding: Optional[float] = None


class PublicationSchema(BaseModel):
    publication_date: Optional[date] = None
    publication_name: Optional[str] = None
    orbilu_link: Optional[str] = None
    mixed_gender: Optional[bool] = False
    mixed_team: Optional[bool] = False


class PhDStudentSchema(BaseModel):
    graduation_year: Optional[int] = None
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
    narrative: Optional[str] = None

    # Dynamic panels
    events: List[EventSchema] = []
    grants: List[GrantProjectSchema] = []
    partnerships: List[PartnershipProjectSchema] = []
    publications: List[PublicationSchema] = []
    phd_students: List[PhDStudentSchema] = []
    awards: List[AwardSchema] = []
    press: List[PressAppearanceSchema] = []

    # Planned contributions
    planned_contributions: Optional[str] = None

    # Feedback
    form_intuitive: Optional[int] = None
    form_easy: Optional[int] = None
    suggestions: Optional[str] = None

    class Config:
        from_attributes = True
