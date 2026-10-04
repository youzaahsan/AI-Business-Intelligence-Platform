# Platform Setup & Installation

This guide walks through configuring and running AgentBI in development and production environments.

## Prerequisites

- Node.js 20+ and npm
- Python 3.11+
- PostgreSQL 16+ (optional for local mock mode)
- Redis 7+ (optional for local task mode)

## 1. Environment Configuration

Copy the example environment configuration:
```bash
cp .env.example .env
```

Key variables:
- `GEMINI_API_KEY`: API key for Google Gemini model generation.
- `DATABASE_URL`: PostgreSQL connection string.
- `REDIS_URL`: Redis broker connection string.
- `JWT_SECRET`: 64-character random key for cryptographic tokens.

## 2. Interactive Full-Stack Development

```bash
# Install node dependencies
npm install

# Start Express full-stack server with Vite middleware on port 3000
npm run dev
```

Open `http://localhost:3000` in your web browser.

## 3. Dedicated Python FastAPI Service

```bash
# Create and activate virtualenv
python3 -m venv venv
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run FastAPI service
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## 4. Complete Containerized Stack via Docker Compose

```bash
docker-compose up --build -d
```
All services (Postgres, Redis, Backend, Worker, Frontend) will initialize automatically with healthchecks.
