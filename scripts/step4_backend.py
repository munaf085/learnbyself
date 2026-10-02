import os

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# pyproject.toml
write_file("apps/api/pyproject.toml", """[project]
name = "learnbyself-api"
version = "0.1.0"
description = "FastAPI backend for LearnBySelf programming education platform"
readme = "README.md"
requires-python = ">=3.11"
dependencies = [
    "fastapi>=0.115.0",
    "uvicorn[standard]>=0.30.0",
    "pydantic>=2.8.0",
    "pydantic-settings>=2.4.0",
    "sqlalchemy>=2.0.30",
    "asyncpg>=0.29.0",
    "passlib[bcrypt]>=1.7.4",
    "pyjwt>=2.9.0",
    "python-multipart>=0.0.9"
]

[project.optional-dependencies]
dev = [
    "pytest>=8.3.0",
    "pytest-asyncio>=0.24.0",
    "httpx>=0.27.0",
    "ruff>=0.6.0"
]

[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]
""")

# Dockerfile
write_file("apps/api/Dockerfile", """FROM python:3.13-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \\
    curl \\
    gcc \\
    libpq-dev \\
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml .
RUN pip install --no-cache-dir .

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
""")

# app/__init__.py
write_file("apps/api/app/__init__.py", "")
write_file("apps/api/app/core/__init__.py", "")
write_file("apps/api/app/db/__init__.py", "")
write_file("apps/api/app/models/__init__.py", "")
write_file("apps/api/app/schemas/__init__.py", "")
write_file("apps/api/app/modules/__init__.py", "")
write_file("apps/api/app/api/__init__.py", "")
write_file("apps/api/app/api/v1/__init__.py", "")
write_file("apps/api/tests/__init__.py", "")

# config.py
write_file("apps/api/app/core/config.py", """import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "LearnBySelf API"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Security
    JWT_SECRET: str = "insecure-dev-secret-key-change-in-production-min32chars"
    JWT_REFRESH_SECRET: str = "insecure-dev-refresh-secret-key-change-in-production-min32chars"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Database & Cache
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/learnbyself"
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
""")

# security.py
write_file("apps/api/app/core/security.py", """import base64
import hashlib
import hmac
import json
import time
from datetime import datetime, timedelta, timezone
from typing import Any, Optional
import jwt
from app.core.config import settings

def hash_password(password: str) -> str:
    \"\"\"
    Cryptographic password hashing using PBKDF2-HMAC-SHA256 with salt.
    Guarantees pure standard-library reliability without external C extensions,
    fully compatible with production security.
    \"\"\"
    salt = os.urandom(16)
    key = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100_000)
    return base64.b64encode(salt + key).decode("ascii")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        decoded = base64.b64decode(hashed_password.encode("ascii"))
        salt = decoded[:16]
        expected_key = decoded[16:]
        computed_key = hashlib.pbkdf2_hmac("sha256", plain_password.encode("utf-8"), salt, 100_000)
        return hmac.compare_digest(expected_key, computed_key)
    except Exception:
        return False

def create_access_token(subject: str | Any, expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {
        "sub": str(subject),
        "exp": expire,
        "type": "access",
        "iat": datetime.now(timezone.utc)
    }
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.ALGORITHM)

def create_refresh_token(subject: str | Any) -> str:
    expire = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode = {
        "sub": str(subject),
        "exp": expire,
        "type": "refresh",
        "iat": datetime.now(timezone.utc)
    }
    return jwt.encode(to_encode, settings.JWT_REFRESH_SECRET, algorithm=settings.ALGORITHM)

def decode_token(token: str, secret: Optional[str] = None) -> dict[str, Any]:
    return jwt.decode(
        token,
        secret or settings.JWT_SECRET,
        algorithms=[settings.ALGORITHM]
    )
""")

# db/base.py
write_file("apps/api/app/db/base.py", """import uuid
from datetime import datetime, timezone
from sqlalchemy import DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False
    )
""")

# db/session.py
write_file("apps/api/app/db/session.py", """from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from app.core.config import settings

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    future=True,
    pool_pre_ping=True
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False
)

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
""")

# models/user.py
write_file("apps/api/app/models/user.py", """import uuid
from enum import Enum
from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin

class UserRole(str, Enum):
    STUDENT = "STUDENT"
    MENTOR = "MENTOR"
    ADMIN = "ADMIN"
    CONTENT_AUTHOR = "CONTENT_AUTHOR"

class Organization(Base, TimestampMixin):
    __tablename__ = "organizations"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(String(32), default=UserRole.STUDENT, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    organization_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("organizations.id", ondelete="SET NULL"),
        nullable=True
    )
""")

# models/curriculum.py
write_file("apps/api/app/models/curriculum.py", """import uuid
from enum import Enum
from sqlalchemy import ForeignKey, Integer, String, Text, JSON, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin

class LanguageModel(Base, TimestampMixin):
    __tablename__ = "languages"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    version: Mapped[str] = mapped_column(String(50), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    icon: Mapped[str] = mapped_column(String(50), nullable=False)
    is_available: Mapped[bool] = mapped_column(Boolean, default=False)
    paradigms: Mapped[list] = mapped_column(JSON, default=list)

class CourseModel(Base, TimestampMixin):
    __tablename__ = "courses"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    language_slug: Mapped[str] = mapped_column(String(50), ForeignKey("languages.slug"), nullable=False)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    level: Mapped[str] = mapped_column(String(50), default="beginner", nullable=False)
    estimated_hours: Mapped[int] = mapped_column(Integer, default=40)
    prerequisites: Mapped[list] = mapped_column(JSON, default=list)
    outcomes: Mapped[list] = mapped_column(JSON, default=list)

class ModuleModel(Base, TimestampMixin):
    __tablename__ = "modules"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_slug: Mapped[str] = mapped_column(String(100), ForeignKey("courses.slug"), nullable=False)
    slug: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    order_index: Mapped[int] = mapped_column(Integer, default=1)
    learning_objectives: Mapped[list] = mapped_column(JSON, default=list)

class LessonModel(Base, TimestampMixin):
    __tablename__ = "lessons"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    module_slug: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    order_index: Mapped[int] = mapped_column(Integer, default=1)
    content_ref: Mapped[str] = mapped_column(String(255), nullable=False)
""")

# models/progress.py
write_file("apps/api/app/models/progress.py", """import uuid
from enum import Enum
from sqlalchemy import Float, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base, TimestampMixin

class ProgressStatusEnum(str, Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    MASTERED = "mastered"

class EnrollmentModel(Base, TimestampMixin):
    __tablename__ = "enrollments"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    course_slug: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[ProgressStatusEnum] = mapped_column(String(32), default=ProgressStatusEnum.IN_PROGRESS)

class ProgressRecordModel(Base, TimestampMixin):
    __tablename__ = "progress_records"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    entity_type: Mapped[str] = mapped_column(String(50), nullable=False)
    entity_id: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[ProgressStatusEnum] = mapped_column(String(32), default=ProgressStatusEnum.IN_PROGRESS)
    score: Mapped[float | None] = mapped_column(Float, nullable=True)
    attempts: Mapped[int] = mapped_column(Integer, default=1)
""")

# api/v1/health.py
write_file("apps/api/app/api/v1/health.py", """from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()

@router.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT
    }
""")

# api/v1/curriculum.py
write_file("apps/api/app/api/v1/curriculum.py", """import json
import os
from pathlib import Path
from fastapi import APIRouter, HTTPException

router = APIRouter()

def get_curriculum_root() -> Path:
    # Look for data/curriculum relative to monorepo root
    current = Path(__file__).resolve()
    for parent in current.parents:
        data_dir = parent / "data" / "curriculum"
        if data_dir.exists():
            return data_dir
    raise RuntimeError("Curriculum data directory not found in repository root")

@router.get("/languages", tags=["Curriculum"])
async def list_languages():
    root = get_curriculum_root()
    manifest_path = root / "manifest.json"
    if not manifest_path.exists():
        raise HTTPException(status_code=500, detail="Curriculum manifest missing")
    with open(manifest_path, "r", encoding="utf-8") as f:
        return json.load(f)

@router.get("/languages/{language_slug}/course", tags=["Curriculum"])
async def get_course(language_slug: str):
    root = get_curriculum_root()
    course_path = root / language_slug / "course.json"
    if not course_path.exists():
        raise HTTPException(status_code=404, detail=f"Course for language '{language_slug}' not found")
    with open(course_path, "r", encoding="utf-8") as f:
        return json.load(f)

@router.get("/languages/{language_slug}/{module_slug}/{lesson_slug}", tags=["Curriculum"])
async def get_lesson(language_slug: str, module_slug: str, lesson_slug: str):
    root = get_curriculum_root()
    lesson_path = root / language_slug / module_slug / f"{lesson_slug}.json"
    if not lesson_path.exists():
        raise HTTPException(status_code=404, detail=f"Lesson '{lesson_slug}' in module '{module_slug}' not found")
    with open(lesson_path, "r", encoding="utf-8") as f:
        return json.load(f)
""")

# api/v1/router.py
write_file("apps/api/app/api/v1/router.py", """from fastapi import APIRouter
from app.api.v1 import health, curriculum

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(curriculum.router, prefix="/curriculum")
""")

# main.py
write_file("apps/api/app/main.py", """from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS Middleware
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "message": "Welcome to LearnBySelf Educational Platform API",
        "docs": "/docs",
        "health": f"{settings.API_V1_STR}/health"
    }
""")

# tests/test_health.py
write_file("apps/api/tests/test_health.py", """import pytest
from httpx import ASGITransport, AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_health_check():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "LearnBySelf" in data["service"]
""")

# tests/test_security.py
write_file("apps/api/tests/test_security.py", """import pytest
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token
)
from app.core.config import settings

def test_password_hashing():
    raw = "BTechSecretPass2026!"
    hashed = hash_password(raw)
    assert hashed != raw
    assert verify_password(raw, hashed) is True
    assert verify_password("WrongPassword!", hashed) is False

def test_jwt_tokens():
    user_id = "test-user-12345"
    access_token = create_access_token(user_id)
    refresh_token = create_refresh_token(user_id)
    
    access_payload = decode_token(access_token)
    assert access_payload["sub"] == user_id
    assert access_payload["type"] == "access"
    
    refresh_payload = decode_token(refresh_token, settings.JWT_REFRESH_SECRET)
    assert refresh_payload["sub"] == user_id
    assert refresh_payload["type"] == "refresh"
""")

# tests/test_curriculum.py
write_file("apps/api/tests/test_curriculum.py", """import pytest
from httpx import ASGITransport, AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_curriculum_endpoints():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # 1. Languages Manifest
        res = await ac.get("/api/v1/curriculum/languages")
        assert res.status_code == 200
        manifest = res.json()
        assert "languages" in manifest
        java = next((lang for lang in manifest["languages"] if lang["slug"] == "java"), None)
        assert java is not None
        assert java["isAvailable"] is True

        # 2. Course Details
        res_course = await ac.get("/api/v1/curriculum/languages/java/course")
        assert res_course.status_code == 200
        course = res_course.json()
        assert course["slug"] == "java"
        assert len(course["sections"]) > 0

        # 3. Lesson Details
        res_lesson = await ac.get("/api/v1/curriculum/languages/java/fundamentals/hello-world")
        assert res_lesson.status_code == 200
        lesson = res_lesson.json()
        assert lesson["slug"] == "hello-world"
        assert len(lesson["activities"]) >= 5
""")

print("Backend API created successfully.")
