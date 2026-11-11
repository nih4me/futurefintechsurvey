from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    basic_auth_username: str
    basic_auth_password: str
    smtp_server: str = "smtp.uni.lu"
    smtp_port: int = 25
    smtp_username: str | None = None
    smtp_password: str | None = None
    smtp_from_email: str "ffintech-do-not-reply@uni.lu"

    class Config:
        env_file = ".env"

settings = Settings()
print(settings)
