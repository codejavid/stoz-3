import React, { useState } from 'react'
import ChatHeader from './components/ChatHeader'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import { askAI } from './services/openrouter'


const App = () => {

  const [messages, setMessages] = useState([]);

  const handleSend = async(text) => {

    const userMessage = {
      role:"user",
      content:text
    };

    const updatedMessage = [...messages, userMessage]

    setMessages(updatedMessage);

    const aiMessage = await askAI(updatedMessage);

    setMessages((prev) => [...prev, aiMessage])



  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
       <ChatHeader/>
       <ChatMessages messages={messages}/>
       <ChatInput onSend={handleSend}/>
    </div>
  )
}

export default App