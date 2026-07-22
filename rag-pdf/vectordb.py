import chromadb
import uuid

client = chromadb.PersistentClient(path="./database")

collection = client.get_or_create_collection(
    name="pdf_chunks"
)


def store_chunks(chunks, embeddings):

    ids = [str(uuid.uuid4()) for _ in chunks]

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings
    )


def search_chunks(query_embedding):

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3
    )

    return results

def get_all_chunks():

    print(collection.count())

    data = collection.get(
        include=["documents", "embeddings"]
    )

    return data