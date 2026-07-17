from fastapi import FastAPI, UploadFile, File
import shutil
from pypdf import PdfReader

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

@app.post("/upload")
def upload_pdf(file: UploadFile = File(...)):
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:
        text += page.extract_text()    

        return{
            "message":"PDF Uploaded succesfully",
            "filename":file.filename,
            "content":text
        }