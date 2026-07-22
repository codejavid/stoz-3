import React, { useState } from 'react'

const ChatInput = ({onSend}) => {

  const [message, setMessage] = useState("");   

  const handleSent = (e) => {
     e.preventDefault();

     if(!message.trim()){
        alert("Please fill it");
     }else{
        onSend(message);
     }
  }


  return (
    <div className="border-t border-zinc-800 p-4">
      <div className="max-w-3xl mx-auto flex gap-3">

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter"){
                handleSent(e);
            }
          }}
          placeholder="Type your message..."
          className="flex-1 rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-3 outline-none focus:border-blue-500"
        />

        <button className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg font-medium"
        onClick={handleSent}>
          Send
        </button>

      </div>
    </div>
  )
}

export default ChatInput