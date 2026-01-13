import secrets
import string

def generate_application_id():
    alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    token = "".join(secrets.choice(alphabet) for _ in range(8))
    return f"FTF-2026-{token}"
