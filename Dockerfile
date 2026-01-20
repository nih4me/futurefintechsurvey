FROM ghcr.io/astral-sh/uv:python3.11-bookworm-slim

WORKDIR /app

COPY backend/requirements.txt .

RUN uv pip install --system --no-cache -r requirements.txt

COPY backend/app/ .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--log-level", "trace", "--host", "0.0.0.0", "--port", "8000"]
