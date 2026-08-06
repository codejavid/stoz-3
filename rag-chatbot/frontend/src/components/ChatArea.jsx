import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'

function EmptyState({ icon, title, description }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <span className="text-2xl">{icon}</span>
      </div>
      <h2 className="mb-2 text-xl font-semibold text-gray-900">{title}</h2>
      <p className="max-w-md text-sm text-gray-500">{description}</p>
    </div>
  )
}

function ChatArea({ messages, chatEnabled = true, isLoading = false }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (!chatEnabled) {
    return (
      <EmptyState
        icon="📄"
        title="Upload a PDF first"
        description="Upload a document to enable the chat. Your questions will be answered using the content from your PDF."
      />
    )
  }

  if (messages.length === 0 && !isLoading) {
    return (
      <EmptyState
        icon="💬"
        title="How can I help you today?"
        description="Ask questions about your documents. Your conversation will appear here."
      />
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}

export default ChatArea
