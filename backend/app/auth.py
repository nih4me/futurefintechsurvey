from fastapi import Depends, HTTPException, status, Query
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from typing import Optional
import secrets

from settings import settings
from database import get_db
from models import Submission
from sqlalchemy.orm import Session

security = HTTPBasic(auto_error=False)

def verify_credentials(
    credentials: Optional[HTTPBasicCredentials] = Depends(security),
    submission_id: Optional[str] = Query(default=None),
    db: Session = Depends(get_db),
):
    # ---- Option 1: Basic Auth ----
    if credentials:
        correct_username = secrets.compare_digest(
            credentials.username, settings.basic_auth_username
        )
        correct_password = secrets.compare_digest(
            credentials.password, settings.basic_auth_password
        )

        if correct_username and correct_password:
            return {"auth_type": "basic", "user": credentials.username}

    # ---- Option 2: Submission ID (DB check) ----
    if submission_id:
        submission = (
            db.query(Submission)
            .filter(Submission.submission_id == submission_id)
            .first()
        )

        if submission:
            return {
                "auth_type": "submission_id",
                "submission_id": submission_id,
            }

    # ---- If neither worked ----
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication (Basic auth or submission_id required)",
        headers={"WWW-Authenticate": "Basic"},
    )