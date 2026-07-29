import React, { useEffect, useState } from 'react'
import api from '../services/api'


const App = () => {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMessage();
  },[]);

  async function fetchMessage() {
    const response = await api.get("/");
    setMessage(response.data.message);
  }

  return (
    <>
     <div>Rag chatbot</div>

     <h2>{message}</h2>
    </>
  )
}

export default App