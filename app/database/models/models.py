"""
Relational Database Models for AgentBI Platform
PostgreSQL Schema with UUIDs, indexes, constraints, and relationships.
"""
from datetime import datetime
import uuid
from sqlalchemy import (
    Column, String, Text, Integer, Float, Boolean, DateTime,
    ForeignKey, JSON, Enum as SAEnum, Index
)
from sqlalchemy.orm import relationship
from app.database.base import Base
from app.security.rbac import Role

def generate_uuid() -> str:
    return str(uuid.uuid4())

class Organization(Base):
    __tablename__ = "organizations"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    users = relationship("User", back_populates="organization")
    projects = relationship("Project", back_populates="organization")

class User(Base):
    __tablename__ = "users"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(SAEnum(Role), default=Role.ANALYST, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    organization = relationship("Organization", back_populates="users")
    audit_logs = relationship("AuditLog", back_populates="user")

class Project(Base):
    __tablename__ = "projects"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    organization = relationship("Organization", back_populates="projects")
    datasets = relationship("Dataset", back_populates="project")
    documents = relationship("Document", back_populates="project")
    workflow_runs = relationship("WorkflowRun", back_populates="project")

class Dataset(Base):
    __tablename__ = "datasets"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=True)
    name = Column(String(255), nullable=False)
    filename = Column(String(255), nullable=False)
    file_type = Column(String(20), nullable=False)  # csv, xlsx, json
    row_count = Column(Integer, default=0)
    col_count = Column(Integer, default=0)
    quality_score = Column(Float, default=100.0)
    missing_cells = Column(Integer, default=0)
    duplicate_rows = Column(Integer, default=0)
    storage_path = Column(String(500), nullable=False)
    summary_stats = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    project = relationship("Project", back_populates="datasets")
    columns = relationship("DatasetColumn", back_populates="dataset", cascade="all, delete-orphan")

class DatasetColumn(Base):
    __tablename__ = "dataset_columns"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    dataset_id = Column(String(36), ForeignKey("datasets.id"), nullable=False)
    column_name = Column(String(255), nullable=False)
    data_type = Column(String(50), nullable=False)
    null_count = Column(Integer, default=0)
    unique_count = Column(Integer, default=0)
    is_numeric = Column(Boolean, default=False)
    mean_val = Column(Float, nullable=True)
    min_val = Column(Float, nullable=True)
    max_val = Column(Float, nullable=True)
    
    dataset = relationship("Dataset", back_populates="columns")

class Document(Base):
    __tablename__ = "documents"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=True)
    title = Column(String(255), nullable=False)
    filename = Column(String(255), nullable=False)
    doc_type = Column(String(50), nullable=False)  # pdf, docx, txt, md
    file_size_bytes = Column(Integer, default=0)
    chunk_count = Column(Integer, default=0)
    vector_indexed = Column(Boolean, default=False)
    storage_path = Column(String(500), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    project = relationship("Project", back_populates="documents")
    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")

class DocumentChunk(Base):
    __tablename__ = "document_chunks"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    document_id = Column(String(36), ForeignKey("documents.id"), nullable=False)
    chunk_index = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)
    vector_id = Column(String(100), nullable=True)
    token_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    document = relationship("Document", back_populates="chunks")

class WorkflowRun(Base):
    __tablename__ = "workflow_runs"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=True)
    workflow_type = Column(String(100), nullable=False)  # business_intelligence, research, multi_agent
    user_prompt = Column(Text, nullable=False)
    status = Column(String(50), default="running")  # pending, running, completed, failed
    execution_plan = Column(JSON, nullable=True)
    final_output = Column(JSON, nullable=True)
    total_duration_ms = Column(Integer, default=0)
    total_tokens = Column(Integer, default=0)
    estimated_cost_usd = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    project = relationship("Project", back_populates="workflow_runs")
    agent_runs = relationship("AgentRun", back_populates="workflow_run", cascade="all, delete-orphan")

class AgentRun(Base):
    __tablename__ = "agent_runs"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    workflow_run_id = Column(String(36), ForeignKey("workflow_runs.id"), nullable=False)
    agent_name = Column(String(100), nullable=False)  # Supervisor, Analyst, Forecast, FactChecker, etc.
    status = Column(String(50), default="completed")
    tools_used = Column(JSON, nullable=True)
    summary_output = Column(Text, nullable=True)
    duration_ms = Column(Integer, default=0)
    tokens_consumed = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    workflow_run = relationship("WorkflowRun", back_populates="agent_runs")

class Customer(Base):
    __tablename__ = "customers"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    customer_code = Column(String(50), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=True)
    segment = Column(String(50), default="Regular")  # High Value, Regular, New, Low Value, At Risk, Inactive
    recency_days = Column(Integer, default=0)
    frequency_orders = Column(Integer, default=0)
    monetary_total = Column(Float, default=0.0)
    rfm_score = Column(String(10), default="333")
    created_at = Column(DateTime, default=datetime.utcnow)

class Product(Base):
    __tablename__ = "products"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    sku = Column(String(50), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    unit_price = Column(Float, default=0.0)
    unit_cost = Column(Float, default=0.0)
    margin_percent = Column(Float, default=0.0)

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    order_id = Column(String(100), nullable=False, index=True)
    date = Column(DateTime, nullable=False, index=True)
    customer_id = Column(String(36), ForeignKey("customers.id"), nullable=True)
    product_id = Column(String(36), ForeignKey("products.id"), nullable=True)
    quantity = Column(Integer, default=1)
    revenue = Column(Float, default=0.0)
    cost = Column(Float, default=0.0)
    gross_profit = Column(Float, default=0.0)
    region = Column(String(100), default="North America")

class BusinessMetric(Base):
    __tablename__ = "business_metrics"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    metric_date = Column(DateTime, nullable=False, index=True)
    total_revenue = Column(Float, default=0.0)
    total_cost = Column(Float, default=0.0)
    gross_profit = Column(Float, default=0.0)
    net_profit = Column(Float, default=0.0)
    profit_margin = Column(Float, default=0.0)
    total_orders = Column(Integer, default=0)
    active_customers = Column(Integer, default=0)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    action = Column(String(100), nullable=False)
    resource_type = Column(String(50), nullable=False)
    resource_id = Column(String(100), nullable=True)
    ip_address = Column(String(50), nullable=True)
    metadata_info = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="audit_logs")
