from sqlalchemy import Column, Boolean, String, Text, Numeric, Integer, Date, DateTime, Enum, ForeignKey
from sqlalchemy.sql import func
from database import Base

class Application(Base):
    __tablename__ = "applications"

    application_id = Column(String(20), primary_key=True)
    status = Column(Enum("draft", "submitted", "reviewed"), default="submitted")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

class ApplicantInfo(Base):
    __tablename__ = "applicant_info"

    application_id = Column(
        String(20),
        ForeignKey("applications.application_id", ondelete="CASCADE"),
        primary_key=True
    )
    email = Column(String(255))
    name = Column(String(100))
    surname = Column(String(100))
    applicant_type = Column(Enum("Fellow", "Affiliated Researcher"))
    affiliated_fellow_email = Column(String(255))
    discipline = Column(Enum("Finance and Economics", "Technology", "Law"))
    events_na = Column(Boolean)
    grants_na = Column(Boolean)
    publications_na = Column(Boolean)
    awards_na = Column(Boolean)
    partnerships_na = Column(Boolean)
    phd_students_na = Column(Boolean)
    press_na = Column(Boolean)
    

class Narrative(Base):
    __tablename__ = "narratives"

    application_id = Column(
        String(20),
        ForeignKey("applications.application_id", ondelete="CASCADE"),
        primary_key=True
    )
    narrative = Column(Text)

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, autoincrement=True)
    application_id = Column(
        String(20),
        ForeignKey("applications.application_id", ondelete="CASCADE")
    )
    event_date = Column(Date)
    event_name = Column(String(255))
    event_type = Column(String(100))
    location = Column(String(150))
    role = Column(String(150))

class GrantProject(Base):
    __tablename__ = "grants_projects"

    id = Column(Integer, primary_key=True, autoincrement=True)
    application_id = Column(
        String(20),
        ForeignKey("applications.application_id", ondelete="CASCADE")
    )
    project_name = Column(String(255))
    start_date = Column(Date)
    end_date = Column(Date)
    funder = Column(Enum("EU", "IAS", "FNR", "Other"))
    funding_programme = Column(String(255))
    mixed_gender = Column(Boolean)
    mixed_team = Column(Boolean)

class PartnershipProject(Base):
    __tablename__ = "partnership_projects"

    id = Column(Integer, primary_key=True, autoincrement=True)
    application_id = Column(
        String(20),
        ForeignKey("applications.application_id", ondelete="CASCADE")
    )
    project_name = Column(String(255))
    start_date = Column(Date)
    partnership_type = Column(Enum("Industrial", "Governmental"))
    partner = Column(String(255))
    acquired_funding = Column(Numeric(12,2))

class Publication(Base):
    __tablename__ = "publications"

    id = Column(Integer, primary_key=True, autoincrement=True)
    application_id = Column(
        String(20),
        ForeignKey("applications.application_id", ondelete="CASCADE")
    )
    publication_date = Column(Date)
    publication_name = Column(String(255))
    orbilu_link = Column(String(500))
    mixed_gender = Column(Boolean)
    mixed_team = Column(Boolean)

class PhDStudent(Base):
    __tablename__ = "phd_students"

    id = Column(Integer, primary_key=True, autoincrement=True)
    application_id = Column(
        String(20),
        ForeignKey("applications.application_id", ondelete="CASCADE")
    )
    graduation_date = Column(Date)
    student_name = Column(String(255))
    thesis_title = Column(String(500))
    career_pursued = Column(Enum("Industry", "Academic"))
    current_work_location = Column(String(150))


class Award(Base):
    __tablename__ = "awards"

    id = Column(Integer, primary_key=True, autoincrement=True)
    application_id = Column(
        String(20),
        ForeignKey("applications.application_id", ondelete="CASCADE")
    )
    award_date = Column(Date)
    award_title = Column(String(255))
    award_subject = Column(String(255))
    award_issuer = Column(String(255))

class PressAppearance(Base):
    __tablename__ = "press_appearances"

    id = Column(Integer, primary_key=True, autoincrement=True)
    application_id = Column(
        String(20),
        ForeignKey("applications.application_id", ondelete="CASCADE")
    )
    appearance_date = Column(Date)
    press_name = Column(String(255))
    press_type = Column(Enum("National", "International"))
    appearance_type = Column(String(255))
    subject = Column(String(255))

class PlannedContribution(Base):
    __tablename__ = "planned_contributions"

    application_id = Column(
        String(20),
        ForeignKey("applications.application_id", ondelete="CASCADE"),
        primary_key=True
    )
    planned_text = Column(Text)

class Feedback(Base):
    __tablename__ = "feedback"

    application_id = Column(
        String(20),
        ForeignKey("applications.application_id", ondelete="CASCADE"),
        primary_key=True
    )
    form_intuitive = Column(Integer)
    form_easy = Column(Integer)
    suggestions = Column(Text)
