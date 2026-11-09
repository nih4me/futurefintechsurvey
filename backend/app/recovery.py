from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import ContributorInfo
from email_utils import send_recovery_email

router = APIRouter(prefix="/api/id-recovery", tags=["ID Recovery"])

@router.get("/forgot-id")
def recover_submission_id(email: str, db: Session = Depends(get_db)):
    contributor = db.query(ContributorInfo).filter_by(email=email).first()
    if not contributor:
        raise HTTPException(
            status_code=404,
            detail="No submission found for this email address."
        )

    try:
        send_recovery_email(email, contributor.submission_id)
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="We encountered an error while sending the recovery email. Please try again later."
        )

    return {
        "message": "A recovery email containing your Submission ID has been sent to your address."
    }