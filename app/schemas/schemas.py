"""
Pydantic V2 Schemas for Requests and Responses
Consistent ApiResponse wrapper with error codes and request tracing.
"""
from typing import Generic, TypeVar, Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field, EmailStr
from app.security.rbac import Role

T = TypeVar("T")

class ErrorDetail(BaseModel):
    code: str
    message: str
    details: Optional[Any] = None

class ApiResponse(BaseModel, Generic[T]):
    success: bool = True
    data: Optional[T] = None
    error: Optional[ErrorDetail] = None
    request_id: str = Field(default_factory=lambda: "req-" + datetime.utcnow().strftime("%Y%m%d%H%M%S"))

# Auth Schemas
class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: str
    role: Optional[Role] = Role.ANALYST

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: Dict[str, Any]

# Project Schemas
class ProjectCreateRequest(BaseModel):
    name: str
    description: Optional[str] = None

# Dataset Schemas
class DatasetSummary(BaseModel):
    id: str
    name: str
    filename: str
    file_type: str
    row_count: int
    col_count: int
    quality_score: float
    missing_cells: int
    duplicate_rows: int
    created_at: datetime

# Document Schemas
class DocumentUploadResponse(BaseModel):
    id: str
    title: str
    filename: str
    doc_type: str
    chunk_count: int
    vector_indexed: bool

# Agent & Workflow Schemas
class WorkflowTriggerRequest(BaseModel):
    prompt: str
    project_id: Optional[str] = None
    dataset_id: Optional[str] = None
    workflow_type: Optional[str] = "business_intelligence"

class AgentStepLog(BaseModel):
    agent_name: str
    status: str
    duration_ms: int
    tokens_consumed: int
    summary: str
    tools_used: List[str] = []

class WorkflowResult(BaseModel):
    workflow_id: str
    status: str
    prompt: str
    plan: List[str]
    steps: List[AgentStepLog]
    final_report: Dict[str, Any]
    total_duration_ms: int
    total_tokens: int

# Research Schemas
class ResearchRequest(BaseModel):
    topic: str
    depth: str = "Standard"  # Quick, Standard, Deep
    sources: List[str] = ["external", "documents", "database"]

class ResearchCitation(BaseModel):
    title: str
    source_url: Optional[str] = None
    document_id: Optional[str] = None
    snippet: str
    confidence: float

class ResearchResult(BaseModel):
    topic: str
    executive_summary: str
    key_findings: List[str]
    citations: List[ResearchCitation]
    verified_facts: List[Dict[str, Any]]
    confidence_score: float

# Analytics & Forecast Schemas
class ForecastRequest(BaseModel):
    metric: str = "sales"
    periods_ahead: int = 30
    algorithm: str = "linear_regression"  # linear_regression, exponential_smoothing, arima

class ForecastPoint(BaseModel):
    date: str
    actual: Optional[float] = None
    predicted: Optional[float] = None
    lower_bound: Optional[float] = None
    upper_bound: Optional[float] = None

class ForecastResult(BaseModel):
    metric: str
    algorithm: str
    points: List[ForecastPoint]
    rmse: float
    mae: float
    mape: float
    summary: str
