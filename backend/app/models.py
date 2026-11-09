from sqlalchemy import Column, Boolean, String, Text, Numeric, Integer, Date, DateTime, Enum, ForeignKey
from sqlalchemy.sql import func
from database import Base

class Submission(Base):
    __tablename__ = "submissions"

    submission_id = Column(String(20), primary_key=True)
    status = Column(Enum("draft", "submitted", "reviewed"), default="submitted")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class ContributorInfo(Base):
    __tablename__ = "contributor_info"

    submission_id = Column(
        String(20),
        ForeignKey("submissions.submission_id", ondelete="CASCADE"),
        primary_key=True
    )
    consent = Column(String(255))
    email = Column(String(255), unique=True)
    name = Column(String(100))
    surname = Column(String(100))
    contributor_type = Column(Enum("Fellow", "Affiliated Researcher", "other"))
    affiliated_fellow_email = Column(String(255))
    discipline = Column(Enum("Finance and Economics", "Technology", "Law", "other"))
    has_events = Column(Boolean)
    has_new_fundings = Column(Boolean)
    has_publications = Column(Boolean)
    all_publications_on_orbilu = Column(String(255))
    has_awards = Column(Boolean)
    has_partnerships = Column(Boolean)
    has_phd_students = Column(Boolean)
    has_press = Column(Boolean)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    

class Narrative(Base):
    __tablename__ = "narratives"

    submission_id = Column(
        String(20),
        ForeignKey("submissions.submission_id", ondelete="CASCADE"),
        primary_key=True
    )
    narrative = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, autoincrement=True)
    submission_id = Column(
        String(20),
        ForeignKey("submissions.submission_id", ondelete="CASCADE")
    )
    event_date = Column(Date)
    event_name = Column(String(255))
    event_type = Column(String(100))
    location = Column(String(150))
    role = Column(String(150))
    roleComment = Column(String(150))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class GrantProject(Base):
    __tablename__ = "grants_projects"

    id = Column(Integer, primary_key=True, autoincrement=True)
    submission_id = Column(
        String(20),
        ForeignKey("submissions.submission_id", ondelete="CASCADE")
    )
    project_name = Column(String(255))
    start_date = Column(Date)
    end_date = Column(Date)
    funder = Column(Enum("EU", "IAS", "FNR", "other"))
    funderComment = Column(String(255))
    funding_programme = Column(String(255))
    role = Column(String(255))
    roleComment = Column(String(255))
    mixed_gender = Column(Boolean)
    mixed_team = Column(Boolean)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class PartnershipProject(Base):
    __tablename__ = "partnership_projects"

    id = Column(Integer, primary_key=True, autoincrement=True)
    submission_id = Column(
        String(20),
        ForeignKey("submissions.submission_id", ondelete="CASCADE")
    )
    project_name = Column(String(255))
    start_date = Column(Date)
    partnership_type = Column(Enum("Industrial", "Governmental", "other"))
    partner = Column(String(255))
    role = Column(String(255))
    roleComment = Column(String(255))
    acquired_funding = Column(Numeric(12,2))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class Publication(Base):
    __tablename__ = "publications"

    id = Column(Integer, primary_key=True, autoincrement=True)
    submission_id = Column(
        String(20),
        ForeignKey("submissions.submission_id", ondelete="CASCADE")
    )
    publication_date = Column(Date)
    publication_name = Column(String(255)) # TODO: Must be replaced with publication title
    orbilu_link = Column(String(500))
    mixed_gender = Column(Boolean)
    mixed_team = Column(Boolean)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class PhDStudent(Base):
    __tablename__ = "phd_students"

    id = Column(Integer, primary_key=True, autoincrement=True)
    submission_id = Column(
        String(20),
        ForeignKey("submissions.submission_id", ondelete="CASCADE")
    )
    graduation_year = Column(Integer)
    student_name = Column(String(255))
    thesis_title = Column(String(500))
    career_pursued = Column(Enum("Industry", "Academic", "other"))
    current_work_location = Column(String(150))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class Award(Base):
    __tablename__ = "awards"

    id = Column(Integer, primary_key=True, autoincrement=True)
    submission_id = Column(
        String(20),
        ForeignKey("submissions.submission_id", ondelete="CASCADE")
    )
    award_date = Column(Date)
    award_title = Column(String(255))
    award_subject = Column(String(255))
    award_issuer = Column(String(255))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class PressAppearance(Base):
    __tablename__ = "press_appearances"

    id = Column(Integer, primary_key=True, autoincrement=True)
    submission_id = Column(
        String(20),
        ForeignKey("submissions.submission_id", ondelete="CASCADE")
    )
    appearance_date = Column(Date)
    press_name = Column(String(255))
    press_type = Column(Enum("National", "International", "other"))
    appearance_type = Column(String(255))
    subject = Column(String(255))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class PlannedContribution(Base):
    __tablename__ = "planned_contributions"

    submission_id = Column(
        String(20),
        ForeignKey("submissions.submission_id", ondelete="CASCADE"),
        primary_key=True
    )
    planned_text = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class Feedback(Base):
    __tablename__ = "feedback"

    submission_id = Column(
        String(20),
        ForeignKey("submissions.submission_id", ondelete="CASCADE"),
        primary_key=True
    )
    form_intuitive = Column(Integer)
    form_easy = Column(Integer)
    suggestions = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
