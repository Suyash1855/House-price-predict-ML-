# House Price Predictor — Frontend

A modern React frontend for the House Price Prediction ML application. Built with React 18, Vite, and Tailwind CSS.

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- The FastAPI backend running at `http://localhost:8000` (or your configured URL)

## Installation

```bash
cd frontend
npm install
```

## Environment Variable

Create a `.env` file in the `frontend/` directory:

```
REACT_APP_API_URL=http://localhost:8000
```

Or copy the example file:

```bash
cp .env.example .env
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory. To preview the production build:

```bash
npm run preview
```

## CORS Configuration

The FastAPI backend must have CORS enabled for `http://localhost:5173` during development. Example backend CORS setup:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
