import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from settings import settings

def send_recovery_email(to_email: str, submission_id: str, survey_link: str = "https://futurefintechfellowship.uni.lux/"):
    """
    Sends an HTML email containing the recovered submission ID and survey link.
    """
    subject = "FutureFinTech Fellowship Survey – Submission ID Recovery"

    # Path to the HTML template
    template_path = os.path.join(os.path.dirname(__file__), "templates", "recovery_email.html")

    try:
        with open(template_path, "r", encoding="utf-8") as f:
            html_content = f.read()

        # Replace the placeholders with the actual values
        body = html_content.replace("{{ submission_id }}", submission_id).replace("{{ survey_link }}", survey_link + '?app=' + submission_id)
    except Exception as e:
        print(f"Failed to read email template: {e}")
        raise e

    msg = MIMEMultipart("alternative")
    msg["From"] = settings.smtp_from_email
    msg["To"] = to_email
    msg["Subject"] = subject

    # Attach HTML version of the email
    msg.attach(MIMEText(body, "html"))

    try:
        with smtplib.SMTP(settings.smtp_server, settings.smtp_port) as server:
            server.starttls()  # Secure the connection
            server.login(settings.smtp_username, settings.smtp_password)
            server.send_message(msg)
    except Exception as e:
        print(f"Failed to send recovery email to {to_email}: {e}")
        raise e
