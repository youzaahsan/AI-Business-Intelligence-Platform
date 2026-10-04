"""
AgentBI FastAPI Application Entry Point
Production-ready Multi-Agent Research & Business Intelligence Platform.
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time
import uuid

from app.config import settings
from app.api.v1.router import api_router
from app.logging_config import logger

app = FastAPI(
    title=settings.APP_NAME,
    description="Enterprise-grade multi-agent autonomous research and business intelligence platform.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request tracing middleware
@app.middleware("http")
async def add_process_time_and_trace(request: Request, call_next):
    start_time = time.time()
    req_id = request.headers.get("X-Request-ID", f"req-{uuid.uuid4().hex[:12]}")
    request.state.request_id = req_id
    
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000
    response.headers["X-Process-Time-Ms"] = f"{process_time:.2f}"
    response.headers["X-Request-ID"] = req_id
    return response

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    req_id = getattr(request.state, "request_id", "unknown")
    logger.error(f"Unhandled error in {request.url.path}: {str(exc)}", extra={"request_id": req_id})
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected error occurred while processing the intelligence workflow."
            },
            "request_id": req_id
        }
    )

# Mount API V1
app.include_router(api_router, prefix=settings.API_V1_PREFIX)

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "environment": settings.APP_ENV,
        "timestamp": time.time()
    }
