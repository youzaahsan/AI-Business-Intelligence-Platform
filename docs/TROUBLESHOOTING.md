# Troubleshooting Guide

Common diagnostic scenarios and verified recovery steps for AgentBI.

## 1. Database Connection Timeout

**Symptom**: `OperationalError: could not connect to server: Connection refused`.
**Fix**:
1. Check if PostgreSQL container is running: `docker-compose ps postgres`.
2. Ensure connection string matches `.env`: `postgresql://postgres:postgres@localhost:5432/nexus_bi`.
3. Check firewall or port collision on port 5432.

## 2. Gemini API / LLM Provider Key Missing

**Symptom**: Warning logs indicating `Deterministic Analytical Synthesis` fallback.
**Fix**:
1. In Google AI Studio, open the **Secrets** panel and ensure `GEMINI_API_KEY` is present.
2. In local environments, set `export GEMINI_API_KEY="your-key"` in `.env`.
3. The platform gracefully switches to local statistical ML computation if an external key is absent.

## 3. Large Dataset Upload Rejected

**Symptom**: `413 Request Entity Too Large`.
**Fix**:
1. Default upload limit is 50MB. Adjust `MAX_UPLOAD_SIZE_BYTES` in `app/config.py`.
2. Confirm the uploaded file has valid UTF-8 encoding and is a valid `.csv`, `.xlsx`, or `.json`.

## 4. Port 3000 In Use

**Symptom**: `Error: listen EADDRINUSE: address already in use :::3000`.
**Fix**:
1. Identify conflicting process: `lsof -i :3000`.
2. Terminate the process or configure `PORT=3001` in `.env`.
