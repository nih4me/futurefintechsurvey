# FutureFinTech Fellows Survey

A web application for collecting and managing annual surveys from FutureFinTech Fellows. The system allows fellows to submit their yearly activity reports including events, publications, grants, partnerships, PhD students, awards, and press appearances.

## Features

- **Survey Submission**: Fellows can submit comprehensive annual activity reports.
- **Dynamic Forms**: Support for multiple data types:
  - Events (conferences, workshops, etc.)
  - Publications
  - Grant projects
  - Partnership projects
  - PhD students supervised
  - Awards received
  - Press appearances
- **Excel Export**: Export all submissions to Excel format with multiple sheets for admin analysis.
- **Authentication**:
  - **Basic Auth**: For administrators to access the export functionality.
  - **Submission ID**: For fellows to load and edit their own submissions via a unique ID.
- **RESTful API**: Full API with OpenAPI documentation available at `/docs`.

## Tech Stack

- **Backend**: FastAPI (Python 3.12+)
- **Database**: SQLite (via SQLAlchemy ORM)
- **Frontend**: Static HTML, CSS, and Vanilla JavaScript
- **Reverse Proxy**: Caddy (handles SSL and routing)
- **Containerization**: Docker & Docker Compose

## Project Structure

```
futurefintech_survey/
├── backend/
│   ├── app/
│   │   ├── auth.py          # Authentication logic
│   │   ├── crud.py          # Database operations
│   │   ├── database.py      # Database connection & session management
│   │   ├── export.py        # Excel export functionality
│   │   ├── main.py          # FastAPI application entry point
│   │   ├── models.py        # SQLAlchemy models
│   │   ├── routers.py       # API routes
│   │   ├── schemas.py       # Pydantic schemas
│   │   ├── settings.py      # Application settings & env vars
│   │   ├── utils.py         # Utility functions (ID generation)
│   │   ├── email_utils.py   # Email notification logic
│   │   └── recovery.py      # Submission recovery utilities
│   ├── requirements.txt     # Python dependencies
│   └── schema.sql          # Raw database schema definition
├── config/
│   └── caddy/               # Caddy configuration files
├── data/
│   └── db/                  # SQLite database storage (persistent)
├── static/
│   ├── index.html           # Main survey form
│   ├── futurefintech_form.js # Core frontend logic
│   └── style.css            # Application styles
├── compose.yml              # Docker Compose configuration
├── Dockerfile               # Backend container definition
└── pyproject.toml           # Python project configuration (uv)
```

## Getting Started

### Local Development (Backend Only)

The recommended way to run the backend locally is using `uv`.

```bash
# Sync dependencies
uv sync

# Setup environment variables
echo "BASIC_AUTH_USERNAME=admin" > backend/app/.env
echo "BASIC_AUTH_PASSWORD=your_password" >> backend/app/.env

# Run the API
uv run uvicorn main:app --host 0.0.0.0 --port 8000
```

Alternatively, using `pip`:
```bash
cd backend
pip install -r requirements.txt
echo "BASIC_AUTH_USERNAME=admin" > backend/app/.env
echo "BASIC_AUTH_PASSWORD=your_password" >> backend/app/.env
cd backend/app
uvicorn main:app --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000` with interactive documentation at `http://localhost:8000/docs`.

### Full Stack (Docker Compose)

For a complete environment including the Caddy reverse proxy:

```bash
# Build and start all services in the background
docker compose up -d --build

# View real-time logs
docker compose logs -f
```

**Services**:
- **Frontend**: `http://localhost:8080`
- **API**: `http://localhost:8000`

## API Reference

### Submissions
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/submissions/` | Create a new submission | None |
| GET | `/api/submissions/{id}` | Load a submission for editing | Submission ID |
| PUT | `/api/submissions/{id}` | Update an existing submission | Submission ID |

### Administration
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/export/` | Export all submissions to Excel | Basic Auth |

## Environment Variables

These variables should be set in `backend/app/.env` or passed via `compose.yml`.

| Variable | Description | Required |
|----------|-------------|----------|
| `BASIC_AUTH_USERNAME` | Username for administrative access | Yes |
| `BASIC_AUTH_PASSWORD` | Password for administrative access | Yes |

## Deployment

The project is designed for Docker deployment. Caddy handles SSL termination and forwards requests to the FastAPI backend. Configuration for the domain and SSL can be adjusted in `compose.yml` and the `Caddyfile`.

```bash
docker compose up -d --build
```
