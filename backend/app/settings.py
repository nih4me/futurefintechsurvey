from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    basic_auth_username: str
    basic_auth_password: str
    smtp_server: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_username: str
    smtp_password: str
    smtp_from_email: str

    class Config:
        env_file = ".env"

settings = Settings()
print(settings)