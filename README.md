# FinCopilot

AI-powered personal finance advisor demo using **Next.js (frontend)**, **ASP.NET Core (backend)**, and **Gemini API**.

## Overview
This demo provides a simple web UI to submit spending/finance questions and receive AI-generated budgeting advice. The backend proxies requests to Gemini, keeping your API key on the server.

## Project Structure
```
/ frontend   -> Next.js app
/ backend    -> ASP.NET Core API
```

## Prerequisites
- Node.js 18+
- .NET 8 SDK
- Gemini API Key

## Environment Variables
Create these files:

### Backend
`backend/FinCopilot.Api/.env` (or set env vars in your shell)
```
GEMINI_API_KEY=YOUR_API_KEY
GEMINI_MODEL=gemini-1.5-flash
```

### Frontend
`frontend/.env.local`
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## Run Backend
```
cd backend/FinCopilot.Api
 dotnet restore
 dotnet run
```
Backend runs on `http://localhost:5000`.

## Run Frontend
```
cd frontend
 npm install
 npm run dev
```
Frontend runs on `http://localhost:3000`.

## API
`POST /api/insights`

Request:
```
{ "input": "I spent too much on food last month, help me plan" }
```

Response:
```
{ "output": "..." }
```

## Notes
- This is a demo MVP with mock transaction context in the backend prompt.
- Replace prompt logic with real transaction ingestion later.
