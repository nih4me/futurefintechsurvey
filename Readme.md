# FutureFinTech Fellows Survey

A web application for collecting and managing annual surveys from FutureFinTech Fellows. The system allows fellows to submit their yearly activity reports including events, publications, grants, partnerships, PhD students, awards, and press appearances.

## Features

- **Survey Submission**: Fellows can submit comprehensive annual activity reports
- **Dynamic Forms**: Support for multiple data types:
  - Events (conferences, workshops, etc.)
  - Publications
  - Grant projects
  - Partnership projects
  - PhD students supervised
  - Awards received
  - Press appearances
- **Excel Export**: Export all submissions to Excel format with multiple sheets
- **Authentication**:
  - Basic Auth (for administrators)
  - Submission ID (for fellows to edit their own submissions)
- **RESTful API**: Full API with OpenAPI documentation at `/docs`

## Tech Stack

- **Backend**: FastAPI (Python)
- **Database**: SQLite
- **Frontend**: Static HTML/JavaScript
- **Reverse Proxy**: Caddy
- **Containerization**: Docker & Docker Compose

## Project Structure

```
futurefintech_survey/
├── backend/
│   ├── app/
│   │   ├── auth.py          # Authentication logic
│   │   ├── crud.py          # Database operations
│   │   ├── database.py      # Database connection
│   │   ├── export.py        # Excel export functionality
│   │   ├── main.py          # FastAPI application entry point
│   │   ├── models.py        # SQLAlchemy models
│   │   ├── routers.py       # API routes
│   │   ├── schemas.py       # Pydantic schemas
│   │   ├── settings.py      # Application settings
│   │   └── utils.py         # Utility functions
│   ├── requirements.txt     # Python dependencies
│   └── schema.sql          # Database schema
├── config/
│   └── caddy/               # Caddy configuration
├── data/
│   └── db/                  # SQLite database storage
├── static/
│   └── index.html           # Frontend application
├── compose.yml              # Docker Compose configuration
├── Dockerfile               # Backend container definition
└── pyproject.toml           # Python project configuration
```

## Requirements

- Python 3.9+
- Docker & Docker Compose (for deployment)

## Local Development

### Backend Only

```bash
# Install dependencies
cd backend
pip install -r requirements.txt

# Set environment variables (create .env file)
echo "BASIC_AUTH_USERNAME=admin" > backend/.env
echo "BASIC_AUTH_PASSWORD=your_password" >> backend/.env

# Run the API
cd backend/app
uvicorn main:app --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000` with interactive documentation at `http://localhost:8000/docs`.

### Full Stack (Docker Compose)

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f
```

Services:
- Frontend: `http://localhost:8080`
- API: `http://localhost:8000` (internal)

## API Endpoints

### Submissions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/submissions/` | Create a new submission |
| GET | `/api/submissions/{submission_id}` | Load a submission for editing |
| PUT | `/api/submissions/{submission_id}` | Update an existing submission |

### Export

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/export/` | Export submissions to Excel |

## Authentication

The API supports two authentication methods:

1. **Basic Auth**: Use for administrative access
   - Username and password configured via environment variables

2. **Submission ID**: Use for fellows to access their own submissions
   - Pass `?submission_id=YOUR_ID` query parameter
   - Validates that the submission exists in the database

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BASIC_AUTH_USERNAME` | Username for admin access | Yes |
| `BASIC_AUTH_PASSWORD` | Password for admin access | Yes |

## Deployment

The project is deployed using Docker Compose with Caddy as a reverse proxy:

```bash
# Build and start all services
docker compose up -d --build
```

The Caddy server handles SSL termination and forwards requests to the API. The domain configuration is in `compose.yml`.

## License

