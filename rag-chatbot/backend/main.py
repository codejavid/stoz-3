from fastapi import FastAPI;
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

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
@app.get("/")
def home():
    return{
        "message":"Welcome to our rag chatbot"
    }


@app.get("/pdf")
def read_pdf():

    loader = PyPDFLoader("data/ai-react.pdf")

    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=200,
        chunk_overlap=50
    )

    chunks = splitter.split_documents(documents)

    # print(chunks[1])

    return{
        "total_chunks":len(chunks),
        "first_chunk":documents[0]
    }