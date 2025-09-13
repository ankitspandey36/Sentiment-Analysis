"""
FastAPI main application file for eConsultation Comment Analyzer.

This file sets up the FastAPI application with all necessary middleware,
routers, and configuration for the comment analysis platform.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from contextlib import asynccontextmanager

# Import routers (to be created)
# from app.api.endpoints import auth, comments, analysis, dashboard
# from app.core.database import engine
# from app.models import Base

# Application metadata
APP_TITLE = "eConsultation Comment Analyzer API"
APP_DESCRIPTION = """
AI-powered stakeholder comment analysis platform for government consultations.

## Features

* **Authentication**: JWT-based secure authentication with role management
* **Comment Processing**: Bulk upload and process consultation comments
* **AI Analysis**: Sentiment analysis, summarization, and keyword extraction
* **Visualizations**: Generate word clouds and analytics charts
* **Export**: PDF and CSV export capabilities
* **Dashboard**: Real-time analytics and insights

## Authentication

Most endpoints require authentication. Obtain a JWT token via the `/auth/login` endpoint
and include it in the `Authorization` header as `Bearer <token>`.

## File Uploads

Supports CSV, Excel (xlsx), and JSON file formats for bulk comment uploads.
Maximum file size: 50MB per upload.
"""

APP_VERSION = "1.0.0"

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager for startup and shutdown events.
    """
    # Startup
    print("🚀 Starting eConsultation Comment Analyzer API...")
    
    # Create database tables
    # async with engine.begin() as conn:
    #     await conn.run_sync(Base.metadata.create_all)
    
    yield
    
    # Shutdown
    print("🛑 Shutting down eConsultation Comment Analyzer API...")

# Create FastAPI application
app = FastAPI(
    title=APP_TITLE,
    description=APP_DESCRIPTION,
    version=APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# CORS middleware configuration
origins = [
    "http://localhost:3000",  # React development server
    "http://localhost:5173",  # Vite development server
    "https://yourdomain.com",  # Production frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["*"],
)

# Trusted host middleware (security)
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1", "yourdomain.com"]
)

# Global exception handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """
    Global HTTP exception handler for consistent error responses.
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "message": exc.detail,
            "status_code": exc.status_code
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """
    Global exception handler for unexpected errors.
    """
    return JSONResponse(
        status_code=500,
        content={
            "error": True,
            "message": "Internal server error",
            "status_code": 500
        }
    )

# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint for monitoring and load balancers.
    """
    return {
        "status": "healthy",
        "message": "eConsultation Comment Analyzer API is running",
        "version": APP_VERSION
    }

# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint with API information.
    """
    return {
        "message": "Welcome to eConsultation Comment Analyzer API",
        "version": APP_VERSION,
        "docs": "/docs",
        "health": "/health"
    }

# Include API routers
# app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
# app.include_router(comments.router, prefix="/api/comments", tags=["Comments"])
# app.include_router(analysis.router, prefix="/api/analysis", tags=["Analysis"])
# app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])

# Placeholder endpoints for development
@app.get("/api/comments", tags=["Comments"])
async def get_comments():
    """
    Placeholder endpoint for fetching comments.
    Returns mock data for frontend development.
    """
    return {
        "comments": [
            {
                "id": 1,
                "text": "This policy change will greatly benefit our community.",
                "sentiment": "positive",
                "score": 0.85,
                "stakeholder_type": "citizen",
                "section": "Policy Section A",
                "created_at": "2024-01-15T10:30:00Z"
            },
            {
                "id": 2,
                "text": "I have concerns about the environmental impact.",
                "sentiment": "negative",
                "score": 0.72,
                "stakeholder_type": "environmental_group",
                "section": "Environmental Impact",
                "created_at": "2024-01-15T14:20:00Z"
            }
        ],
        "total": 2,
        "page": 1,
        "per_page": 10
    }

@app.post("/api/analysis/analyze-comment", tags=["Analysis"])
async def analyze_comment(comment: dict):
    """
    Placeholder endpoint for single comment analysis.
    """
    return {
        "sentiment": "positive",
        "confidence": 0.87,
        "summary": "Positive feedback about policy benefits",
        "keywords": ["policy", "benefits", "community", "support"],
        "emotions": {
            "joy": 0.6,
            "trust": 0.8,
            "anticipation": 0.4
        }
    }

@app.get("/api/dashboard/stats", tags=["Dashboard"])
async def get_dashboard_stats():
    """
    Placeholder endpoint for dashboard statistics.
    """
    return {
        "total_comments": 1247,
        "sentiment_distribution": {
            "positive": 45.2,
            "neutral": 32.1,
            "negative": 18.7,
            "mixed": 4.0
        },
        "top_keywords": [
            {"word": "policy", "count": 234},
            {"word": "community", "count": 187},
            {"word": "environment", "count": 156}
        ],
        "processing_stats": {
            "processed_today": 89,
            "avg_processing_time": 0.3,
            "accuracy_rate": 92.5
        }
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )