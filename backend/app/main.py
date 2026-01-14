from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import router as applications_router
from export import router as exports_router
from database import Base, engine

# Create tables (optional – only for dev)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FutureFinTech Fellows API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(applications_router)
app.include_router(exports_router)