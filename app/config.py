"""
AgentBI Configuration Module
Centralized Pydantic Settings with dynamic environment variable validation.
"""
import os
from typing import List, Optional
from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    # Application Info
    APP_NAME: str = "AgentBI - Multi-Agent AI Research & Business Intelligence Platform"
    APP_ENV: str = Field(default="development", env="APP_ENV")
    DEBUG: bool = Field(default=False, env="DEBUG")
    API_V1_PREFIX: str = "/api/v1"
    PORT: int = Field(default=3000, env="PORT")

    # Database
    DATABASE_URL: str = Field(
        default="postgresql+asyncpg://postgres:postgres@localhost:5432/nexus_bi",
        env="DATABASE_URL"
    )
    DATABASE_SYNC_URL: str = Field(
        default="postgresql://postgres:postgres@localhost:5432/nexus_bi",
        env="DATABASE_SYNC_URL"
    )
    DB_POOL_SIZE: int = 10
    DB_MAX_OVERFLOW: int = 20

    # Redis Cache & Message Queue
    REDIS_URL: str = Field(default="redis://localhost:6379/0", env="REDIS_URL")

    # Security & Auth
    JWT_SECRET: str = Field(default="dev-super-secure-secret-key-change-in-production-12345", env="JWT_SECRET")
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRES_IN: int = 86400  # 24 hours
    REFRESH_TOKEN_EXPIRES_IN: int = 604800  # 7 days

    # LLM Settings
    LLM_PROVIDER: str = Field(default="gemini", env="LLM_PROVIDER")  # gemini, openai, anthropic
    LLM_API_KEY: Optional[str] = Field(default=None, env="GEMINI_API_KEY")
    LLM_MODEL: str = Field(default="gemini-2.5-flash", env="LLM_MODEL")
    LLM_TEMPERATURE: float = 0.2
    EMBEDDING_MODEL: str = "text-embedding-004"

    # Vector Database
    VECTOR_DB_PROVIDER: str = Field(default="chromadb", env="VECTOR_DB_PROVIDER")
    VECTOR_DB_URL: Optional[str] = Field(default="http://localhost:8000", env="VECTOR_DB_URL")
    VECTOR_DB_COLLECTION: str = "nexus_bi_knowledge"

    # External Search
    WEB_SEARCH_PROVIDER: str = "tavily"
    WEB_SEARCH_API_KEY: Optional[str] = Field(default=None, env="WEB_SEARCH_API_KEY")

    # File Storage
    STORAGE_PROVIDER: str = "local"
    STORAGE_LOCAL_PATH: str = "./data/uploads"
    MAX_UPLOAD_SIZE_BYTES: int = 50 * 1024 * 1024  # 50MB

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173", "*"]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"

settings = Settings()
