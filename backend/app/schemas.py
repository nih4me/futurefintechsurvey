from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date

# ----------------------------
# Applicant Information
# ----------------------------

class ApplicantInfoSchema(BaseModel):
    email: EmailStr
    name: str
    surname: str
    applicant_type: str
    affiliated_fellow_email: Optional[EmailStr] = None
    discipline: str
    events_na: Optional[bool] = False
    grants_na: Optional[bool] = False
    publications_na: Optional[bool] = False

# ----------------------------
# Dynamic Panels
# ----------------------------

class EventSchema(BaseModel):
    event_date: Optional[date]
    event_name: Optional[str]
    event_type: Optional[str]
    location: Optional[str]
    role: Optional[str]


class GrantProjectSchema(BaseModel):
    project_name: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]
    funder: Optional[str]
    funding_programme: Optional[str]
    mixed_gender: Optional[bool] = False
    mixed_team: Optional[bool] = False


class PartnershipProjectSchema(BaseModel):
    project_name: Optional[str]
    start_date: Optional[date]
    partnership_type: Optional[str]
    partner: Optional[str]
    acquired_funding: Optional[float]


class PublicationSchema(BaseModel):
    publication_date: Optional[date]
    publication_name: Optional[str]
    orbilu_link: Optional[str]
    mixed_gender: Optional[bool] = False
    mixed_team: Optional[bool] = False


class PhDStudentSchema(BaseModel):
    graduation_date: Optional[date]
    student_name: Optional[str]
    thesis_title: Optional[str]
    career_pursued: Optional[str]
    current_work_location: Optional[str]


class AwardSchema(BaseModel):
    award_date: Optional[date]
    award_title: Optional[str]
    award_subject: Optional[str]
    award_issuer: Optional[str]


class PressAppearanceSchema(BaseModel):
    appearance_date: Optional[date]
    press_name: Optional[str]
    press_type: Optional[str]
    appearance_type: Optional[str]
    subject: Optional[str]


# ----------------------------
# Survey Root Payload
# ----------------------------

class ApplicationSurveySchema(BaseModel):
    # Applicant
    applicant: ApplicantInfoSchema

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
    form_intuitive: Optional[int]
    form_easy: Optional[int]
    suggestions: Optional[str]

    class Config:
        from_attributes = True
