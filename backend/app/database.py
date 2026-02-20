from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

PRODUCTION = False

if not PRODUCTION:
    DATABASE_URL = "sqlite:////db/futurefintech.db"
    # DATABASE_URL = "sqlite:///futurefintech.db"
else:
    DATABASE_URL = "mysql+pymysql://user:password@localhost/futurefintech_DB"

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=3600
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
