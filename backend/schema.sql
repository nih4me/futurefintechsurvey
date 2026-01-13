/* ============================================================
   Database: futurefintech_DB
   Purpose : Store SurveyJS responses for Fellows Applications
   Key     : Alphanumeric application_id (no authentication)
   Engine  : MariaDB / InnoDB
   Charset : utf8mb4
   ============================================================ */

CREATE DATABASE IF NOT EXISTS futurefintech_DB
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE futurefintech_DB;

/* ============================================================
   1. Applications (ROOT TABLE)
   ============================================================ */

CREATE TABLE applications (
  application_id CHAR(20) PRIMARY KEY,
  application_year INT NOT NULL DEFAULT 2026,
  status ENUM('draft','submitted','reviewed') DEFAULT 'submitted',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

/* ============================================================
   2. Applicant Information
   ============================================================ */

CREATE TABLE applicant_info (
  application_id CHAR(20) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  applicant_type ENUM('Fellow','Affiliated Researcher') NOT NULL,
  affiliated_fellow_email VARCHAR(255),
  discipline ENUM('Finance and Economics','Technology','Law') NOT NULL,

  CONSTRAINT fk_applicant_info_app
    FOREIGN KEY (application_id)
    REFERENCES applications(application_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

/* ============================================================
   3. Short Narrative
   ============================================================ */

CREATE TABLE narratives (
  application_id CHAR(20) PRIMARY KEY,
  narrative TEXT NOT NULL,

  CONSTRAINT fk_narratives_app
    FOREIGN KEY (application_id)
    REFERENCES applications(application_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

/* ============================================================
   4. Events
   ============================================================ */

CREATE TABLE events (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  application_id CHAR(20) NOT NULL,
  event_date DATE,
  event_name VARCHAR(255),
  event_type ENUM(
    'FutureFinTech Lecture',
    'Working Papers',
    'Conference',
    'FutureFinTech Federated Conference (F3C)',
    'FutureFinTech Annual Event',
    'Other'
  ),
  location VARCHAR(150),
  role ENUM(
    'Attendee',
    'Presenter, Moderator or Session Chair',
    'Speaker',
    'Keynote Speaker',
    'Organizer',
    'Co-Organizer',
    'Reviewer',
    'Committee Member',
    'Track Chair',
    'Programme Chair',
    'Conference Chair'
  ),

  CONSTRAINT fk_events_app
    FOREIGN KEY (application_id)
    REFERENCES applications(application_id)
    ON DELETE CASCADE,

  INDEX idx_events_app (application_id)
) ENGINE=InnoDB;

/* ============================================================
   5. Grants & Projects
   ============================================================ */

CREATE TABLE grants_projects (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  application_id CHAR(20) NOT NULL,
  project_name VARCHAR(255),
  start_date DATE,
  end_date DATE,
  funder ENUM('EU','IAS','FNR','Other'),
  funding_programme VARCHAR(255),
  mixed_gender BOOLEAN DEFAULT FALSE,
  mixed_team BOOLEAN DEFAULT FALSE,

  CONSTRAINT fk_grants_app
    FOREIGN KEY (application_id)
    REFERENCES applications(application_id)
    ON DELETE CASCADE,

  INDEX idx_grants_app (application_id)
) ENGINE=InnoDB;

/* ============================================================
   6. Partnership Projects
   ============================================================ */

CREATE TABLE partnership_projects (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  application_id CHAR(20) NOT NULL,
  project_name VARCHAR(255),
  start_date DATE,
  partnership_type ENUM('Industrial','Governmental'),
  partner VARCHAR(255),
  acquired_funding DECIMAL(12,2),

  CONSTRAINT fk_partnerships_app
    FOREIGN KEY (application_id)
    REFERENCES applications(application_id)
    ON DELETE CASCADE,

  INDEX idx_partnerships_app (application_id)
) ENGINE=InnoDB;

/* ============================================================
   7. Publications
   ============================================================ */

CREATE TABLE publications (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  application_id CHAR(20) NOT NULL,
  publication_date DATE,
  publication_name VARCHAR(255),
  orbilu_link VARCHAR(500),
  mixed_gender BOOLEAN DEFAULT FALSE,
  mixed_team BOOLEAN DEFAULT FALSE,

  CONSTRAINT fk_publications_app
    FOREIGN KEY (application_id)
    REFERENCES applications(application_id)
    ON DELETE CASCADE,

  INDEX idx_publications_app (application_id)
) ENGINE=InnoDB;

/* ============================================================
   8. PhD Students
   ============================================================ */

CREATE TABLE phd_students (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  application_id CHAR(20) NOT NULL,
  graduation_date DATE,
  student_name VARCHAR(255),
  thesis_title VARCHAR(500),
  career_pursued ENUM('Industry','Academic'),
  current_work_location VARCHAR(150),

  CONSTRAINT fk_phd_app
    FOREIGN KEY (application_id)
    REFERENCES applications(application_id)
    ON DELETE CASCADE,

  INDEX idx_phd_app (application_id)
) ENGINE=InnoDB;

/* ============================================================
   9. Scientific Awards
   ============================================================ */

CREATE TABLE awards (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  application_id CHAR(20) NOT NULL,
  award_date DATE,
  award_title VARCHAR(255),
  award_subject VARCHAR(255),
  award_issuer VARCHAR(255),

  CONSTRAINT fk_awards_app
    FOREIGN KEY (application_id)
    REFERENCES applications(application_id)
    ON DELETE CASCADE,

  INDEX idx_awards_app (application_id)
) ENGINE=InnoDB;

/* ============================================================
   10. Press Appearances
   ============================================================ */

CREATE TABLE press_appearances (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  application_id CHAR(20) NOT NULL,
  appearance_date DATE,
  press_name VARCHAR(255),
  press_type ENUM('National','International'),
  appearance_type VARCHAR(255),
  subject VARCHAR(255),

  CONSTRAINT fk_press_app
    FOREIGN KEY (application_id)
    REFERENCES applications(application_id)
    ON DELETE CASCADE,

  INDEX idx_press_app (application_id)
) ENGINE=InnoDB;

/* ============================================================
   11. Planned Contributions
   ============================================================ */

CREATE TABLE planned_contributions (
  application_id CHAR(20) PRIMARY KEY,
  planned_text TEXT NOT NULL,

  CONSTRAINT fk_planned_app
    FOREIGN KEY (application_id)
    REFERENCES applications(application_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

/* ============================================================
   12. Feedback
   ============================================================ */

CREATE TABLE feedback (
  application_id CHAR(20) PRIMARY KEY,
  form_intuitive TINYINT,
  form_easy TINYINT,
  suggestions TEXT,

  CONSTRAINT fk_feedback_app
    FOREIGN KEY (application_id)
    REFERENCES applications(application_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

/* ============================================================
   END OF SCHEMA
   ============================================================ */
