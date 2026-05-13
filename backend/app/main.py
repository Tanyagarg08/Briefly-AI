from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import PyPDF2
import io

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Model
class TextRequest(BaseModel):
    text: str

# Home Route
@app.get("/")
def home():
    return {
        "message": "DocuMind AI Backend Running"
    }

# Text Summarization Route
@app.post("/summarize")
def summarize(data: TextRequest):

    text = data.text

    text = text.replace("\n", " ")

    sentences = text.split(".")

    sentences = [s.strip() for s in sentences if s.strip()]

    if len(sentences) > 5:
        summary_sentences = [
            sentences[0],
            sentences[len(sentences)//2],
            sentences[-1]
        ]
    else:
        summary_sentences = sentences[:2]

    summary = ". ".join(summary_sentences)

    return {
        "summary": summary + "."
    }

# PDF Upload Route
@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    pdf_reader = PyPDF2.PdfReader(io.BytesIO(await file.read()))

    extracted_text = ""

    for page in pdf_reader.pages:
        extracted_text += page.extract_text()

    # Simple summary logic
    sentences = extracted_text.split(".")

    sentences = [s.strip() for s in sentences if s.strip()]

    if len(sentences) > 5:
        summary_sentences = [
            sentences[0],
            sentences[len(sentences)//2],
            sentences[-1]
        ]
    else:
        summary_sentences = sentences[:2]

    summary = ". ".join(summary_sentences)

    return {
        "summary": summary + "."
    }