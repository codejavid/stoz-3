from fastapi import FastAPI, UploadFile, File
import shutil
from pypdf import PdfReader
from chunker import chunk_text
from embedding import create_embedding
from vectordb import store_chunks,search_chunks, get_all_chunks

app = FastAPI()

@app.get("/")
def home():
    return{
        "message":"Welcome RAG"
    }

@app.get("/about")
def home():
    return{
        "message":"This is my fast api project"
    }

@app.get("/hello")
def home():
    return{
        "message":"Hello javid"
    }

@app.get("/database")
def database():
    return get_all_chunks

@app.post("/upload")
def upload_pdf(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text += page_text

    chunks = chunk_text(text)

    embeddings = []

    for chunk in chunks:
        embeddings.append(create_embedding(chunk))

    store_chunks(chunks, embeddings)

    return {
        "message": "Stored Successfully",
        "total_chunks": len(chunks)
    }


@app.post("/chat")
def chat(question: str):

    question_embedding = create_embedding(question)

    result = search_chunks(question_embedding)

    return {
        "question": question,
        "result": result["documents"][0]
    }