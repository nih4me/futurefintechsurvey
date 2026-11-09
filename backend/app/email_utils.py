import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from settings import settings

def send_recovery_email(to_email: str, submission_id: str):
    """
    Sends an email containing the recovered submission ID.
    """
    subject = "Your FutureFinTech Submission ID"
    body = (
        f"Hello,\n\n"
        f"You requested to recover your Submission ID for the FutureFinTech Fellows Survey.\n\n"
        f"Your Submission ID is: {submission_id}\n\n"
        f"You can use this ID to resume your report on the survey portal.\n\n"
        f"Best regards,\n"
        f"FutureFinTech Team"
    )

    msg = MIMEMultipart()
    msg["From"] = settings.smtp_from_email
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(settings.smtp_server, settings.smtp_port) as server:
            server.starttls()  # Secure the connection
            server.login(settings.smtp_username, settings.smtp_password)
            server.send_message(msg)
    except Exception as e:
        print(f"Failed to send recovery email to {to_email}: {e}")
        raise e
