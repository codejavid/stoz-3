
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

def ask_llm(context, question):
    prompt = f"""
     You are a helpfull AI assistant.

     Answer only using the context below.

     if the answer is not in the context, say:
     "I could not find that information in the uploded PDF"

    Context:
    {context}

    Question:
    {question}
    """
      
    response  = client.chat.completions.create(
        model="deepseek/deepseek-chat-v3.1",
        messages=[
                {
                "role": "user",
                "content": prompt
                }
        ]
    )

    return response.choices[0].message.content

