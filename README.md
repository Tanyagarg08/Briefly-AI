# Briefly AI

Briefly AI is a modern AI-powered document summarization web application that helps users quickly generate concise summaries from long text and PDF documents.

## Features

- AI-powered text summarization
- PDF document upload and summarization
- Modern responsive UI
- Copy summary functionality
- Download summary as text file
- Smooth animations and premium design
- Fast and lightweight workflow

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- FastAPI
- Python
- PyPDF2

## Project Structure

Briefly-AI/
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/
│ ├── app/
│ └── venv/
│
└── README.md

## Installation

### Clone Repository

```bash
git clone https://github.com/Tanyagarg08/Briefly-AI.git
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate

pip install fastapi uvicorn python-multipart PyPDF2

python -m uvicorn app.main:app --reload
```

## Frontend URL

```bash
http://localhost:5173
```

## Backend URL

```bash
http://127.0.0.1:8000
```

## Future Improvements

- Real AI model integration
- User authentication
- Cloud deployment
- Multi-language summaries
- Dark/light mode toggle
- Export summaries as PDF

## Author

Tanya Garg
