from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    basic_auth_username: str
    basic_auth_password: str

    class Config:
        env_file = ".env"

settings = Settings()
print(settings)