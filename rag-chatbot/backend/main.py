from fastapi import FastAPI, UploadFile, File;
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from fastapi import Query
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from pydantic import BaseModel
import os
import uuid
import shutil

load_dotenv()

app = FastAPI()

# Configure CORS to allow requests from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER="uploads"
CHROMA_FOLDER="chroma_db"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CHROMA_FOLDER, exist_ok=True)


embedding = HuggingFaceEmbeddings(
    model_name = "sentence-transformers/all-MiniLM-L6-v2"
)


llm = ChatOpenAI(
    model="poolside/laguna-s-2.1:free",
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)

@app.get("/")
def home():
    return{
        "message":"Welcome to our rag chatbot"
    }

@app.post("/upload")
async def upload_pdf(file:UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        return {"Error":"please upload a PDF file"}
    
    file_id = str(uuid.uuid4())

    pdf_path = os.path.join(
        UPLOAD_FOLDER,
        f"{file_id}.pdf"
    )

    with open(pdf_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    loader = PyPDFLoader(pdf_path)

    documents = loader.load()


    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=200,
        chunk_overlap=50
    )

    chunks = splitter.split_documents(documents)

    vector_store = Chroma.from_documents(
        documents= chunks,
        embedding = embedding,
        persist_directory=os.path.join(
            CHROMA_FOLDER,
            file_id
        )
    )   

    return{
        "message":"PDF uploded successfully",
        "file_id":file_id,
        "chunks":len(chunks)
    }

@app.get("/embedding")
def get_embedding():


    vector = embedding.embed_query(
        "React is a javascript library"
    )

    return{
        "dimensions":len(vector),
        "first_five_numbers":vector[:5]
    }

@app.get("/store")
def store_pdf():
    loader = PyPDFLoader("data/ai-react.pdf")

    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=200,
        chunk_overlap=50
    )

    chunks = splitter.split_documents(documents)

    vector_store = Chroma.from_documents(
        documents= chunks,
        embedding = embedding,
        persist_directory="./chroma_db"
    )

    return {
        "message":"PDF stored succesfully",
        "chunks":len(chunks)
    }


@app.get("/search")
def search(question: str= Query(...)):

    loader = PyPDFLoader("data/ai-react.pdf")

    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=200,
        chunk_overlap=50
    )



    chunks = splitter.split_documents(documents)

    vector_store = Chroma.from_documents(
        documents= chunks,
        embedding = embedding,
        persist_directory="./chroma_db"
    )

    retriever = vector_store.as_retriever()

    results = retriever.invoke(question)

    return {
        "question":question,
        "result":results[0].page_content
    }

@app.get("/ai")
def ask_ai():
    response = llm.invoke(
        "Say Hello"
    )

    return{
        "answer":response
    }

class ChatRequest(BaseModel):
    file_id: str
    question: str

@app.post("/chat")
def chat(data: ChatRequest):

    file_id = data.file_id
    question = data.question

    vector_store = Chroma(
        persist_directory=f"./chroma_db/{file_id}",
        embedding_function=embedding
    )

    retriever = vector_store.as_retriever(
        search_kwargs={"k": 4}
    )

    results = retriever.invoke(question)

    context = ""

    for document in results:
        context += document.page_content
        context += "\n\n"

    print("========== CONTEXT ==========")
    print(context)
    print("=============================")

    prompt = f"""
            You are a helpful AI assistant.

            Use ONLY the context below to answer the question.

            If the answer is not available in the context,
            reply exactly:

            I don't know.

            Context:
            {context}

            Question:
            {question}

            Answer:
        """

    response = llm.invoke(prompt)

    return {
        "file_id": file_id,
        "question": question,
        "answer": response.content
    }
