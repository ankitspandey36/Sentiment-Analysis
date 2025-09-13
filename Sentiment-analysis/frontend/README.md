# eConsultation Platform

A comprehensive AI-powered platform for analyzing stakeholder comments and feedback in government consultations and enterprise engagement processes.

## Project Structure

```
├── frontend/          # React frontend application
├── backend/           # Python FastAPI backend
└── README.md          # This file
```

## Frontend

The frontend is a modern React application with TypeScript, featuring:

- **Analytics Dashboard**: Real-time insights and visualizations
- **Comment Processing**: Bulk upload and AI analysis
- **Dark/Light Mode**: Theme support with next-themes
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Charts**: Data visualization with Recharts

### Quick Start (Frontend)

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:8080`

## Backend

The backend is a Python FastAPI application that provides:

- AI-powered sentiment analysis
- Comment processing APIs
- Data storage and retrieval
- Authentication and authorization

### Quick Start (Backend)

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

The backend API will be available at `http://localhost:8000`

## Features

### 🎯 Core Features
- **AI Sentiment Analysis**: Advanced natural language processing
- **Bulk Comment Processing**: Handle thousands of comments efficiently
- **Interactive Visualizations**: Charts, graphs, and data insights
- **Export Capabilities**: PDF and CSV report generation
- **Multi-format Support**: Various file types for comment import

### 🛠 Technical Features
- **Modern Tech Stack**: React 18, TypeScript, Python FastAPI
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Live dashboard with automatic refresh
- **Secure Authentication**: Role-based access control
- **API Documentation**: Swagger/OpenAPI integration

## Lovable Integration

**Project URL**: https://lovable.dev/projects/9be8a0f2-bc9a-4e00-b596-1361d0ec3fc8

### Development with Lovable

Changes made via Lovable will be committed automatically to this repo. You can also work locally:

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start development server
npm run dev
```

### Deployment

Simply open [Lovable](https://lovable.dev/projects/9be8a0f2-bc9a-4e00-b596-1361d0ec3fc8) and click on Share → Publish.

### Custom Domain

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
