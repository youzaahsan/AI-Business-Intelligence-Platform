# Continuous Integration & Deployment (CI/CD)

AgentBI employs an automated GitHub Actions pipeline validating linting, security scanning, type checks, unit tests, and container builds.

## Pipeline Workflow (`.github/workflows/ci.yml`)

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python 3.11
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: "pip"

      - name: Install Python Dependencies
        run: |
          pip install -r requirements.txt

      - name: Run Python Pytest Suite
        run: |
          pytest --cov=app tests/

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install NPM Packages & Type Check
        run: |
          npm ci
          npm run lint
          npm run build

  container-build:
    needs: validate
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker Images
        run: |
          docker build -t agentbi-backend:latest .
```
