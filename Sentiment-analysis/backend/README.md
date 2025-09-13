# eConsultation Comment Analyzer - Backend

This directory contains the FastAPI backend for the eConsultation Comment Analyzer platform.

## Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py           # Application configuration
│   │   ├── security.py         # JWT and authentication utilities
│   │   └── database.py         # Database connection and setup
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py             # Dependencies (auth, db session, etc.)
│   │   └── endpoints/
│   │       ├── __init__.py
│   │       ├── auth.py         # Authentication endpoints
│   │       ├── comments.py     # Comment CRUD operations
│   │       ├── analysis.py     # AI analysis endpoints
│   │       └── dashboard.py    # Dashboard data endpoints
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py             # User database model
│   │   ├── comment.py          # Comment database model
│   │   └── analysis.py         # Analysis results model
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py             # User Pydantic schemas
│   │   ├── comment.py          # Comment Pydantic schemas
│   │   └── analysis.py         # Analysis Pydantic schemas
│   ├── services/
│   │   ├── __init__.py
│   │   ├── ai_analysis.py      # AI/ML analysis service
│   │   ├── word_cloud.py       # Word cloud generation
│   │   └── export.py           # Data export utilities
│   └── utils/
│       ├── __init__.py
│       └── helpers.py          # Utility functions
├── tests/
│   ├── __init__.py
│   ├── conftest.py             # Test configuration
│   ├── test_auth.py            # Authentication tests
│   ├── test_comments.py        # Comment endpoint tests
│   └── test_analysis.py        # Analysis endpoint tests
├── alembic/                    # Database migrations
├── requirements.txt            # Python dependencies
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose setup
└── .env.example               # Environment variables template
```

## Getting Started

### Prerequisites
- Python 3.9+
- PostgreSQL 13+
- Redis (for caching)

### Setup
1. Create virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Setup environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run database migrations:
   ```bash
   alembic upgrade head
   ```

5. Start the development server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### API Documentation
Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Key Features

### Authentication
- JWT-based authentication
- Role-based access control (Admin, Analyst)
- Secure password hashing

### Comment Processing
- Bulk file upload (CSV, Excel, JSON)
- Batch processing with progress tracking
- Data validation and cleaning

### AI Analysis
- Sentiment analysis (positive/negative/neutral/mixed)
- Automatic summarization
- Keyword extraction
- Confidence scoring

### Data Export
- CSV export with filters
- PDF report generation
- Real-time dashboard data

### Performance
- Async request handling
- Database connection pooling
- Redis caching for frequent queries
- Background task processing

## Development

### Code Style
- Follow PEP 8 guidelines
- Use type hints throughout
- Comprehensive docstrings
- 90%+ test coverage target

### Testing
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_auth.py -v
```

### Database Migrations
```bash
# Create new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

## Deployment

### Docker
```bash
# Build and run with Docker Compose
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables
Required environment variables for production:

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/econsultation
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AI Services (when integrated)
OPENAI_API_KEY=your-openai-key
HUGGINGFACE_API_KEY=your-hf-key

# File Storage
MAX_FILE_SIZE=50MB
ALLOWED_EXTENSIONS=csv,xlsx,json

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user

### Comments
- `POST /api/comments/upload` - Bulk upload comments
- `GET /api/comments/` - List comments with filters
- `PUT /api/comments/{id}` - Update comment
- `DELETE /api/comments/{id}` - Delete comment

### Analysis
- `POST /api/analysis/analyze-comment` - Analyze single comment
- `POST /api/analysis/batch-analyze` - Batch analyze comments
- `GET /api/analysis/wordcloud` - Generate word cloud
- `GET /api/analysis/dashboard-data` - Get dashboard metrics

### Export
- `GET /api/export/csv` - Export filtered data as CSV
- `GET /api/export/pdf` - Export report as PDF

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.