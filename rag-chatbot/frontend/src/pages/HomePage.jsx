import { useEffect, useState } from 'react'
import ChatArea from '../components/ChatArea'
import ChatInput from '../components/ChatInput'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import UploadPage from './UploadPage'
import { getStoredFileId, saveFileId } from '../services/uploadService'
import { sendChatMessage } from '../services/chatService'

function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [fileId, setFileId] = useState(() => getStoredFileId())
  const [activeView, setActiveView] = useState(() =>
    getStoredFileId() ? 'chat' : 'upload',
  )
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const chatEnabled = Boolean(fileId)

  useEffect(() => {
    if (!successMessage) return undefined

    const timer = setTimeout(() => setSuccessMessage(''), 5000)
    return () => clearTimeout(timer)
  }, [successMessage])

  async function handleSendMessage() {
    if (!chatEnabled || isLoading) return

    const trimmed = input.trim()
    if (!trimmed) return

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const data = await sendChatMessage(trimmed)

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.answer,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        id: crypto.randomUUID(),
        role: 'error',
        content: error.message,
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  function handleUploadSuccess(data) {
    saveFileId(data.file_id)
    setFileId(data.file_id)
    setSuccessMessage(data.message || 'PDF uploaded successfully!')
    setActiveView('chat')
  }

  function handleNavigate(view) {
    if (view === 'chat' && !chatEnabled) return
    setActiveView(view)
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeView={activeView}
        onNavigate={handleNavigate}
        chatEnabled={chatEnabled}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {successMessage && activeView === 'chat' && (
          <div
            className="mx-4 mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            role="status"
          >
            {successMessage}
          </div>
        )}

        {activeView === 'chat' ? (
          <>
            <ChatArea
              messages={messages}
              chatEnabled={chatEnabled}
              isLoading={isLoading}
            />
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={handleSendMessage}
              disabled={!chatEnabled}
              isLoading={isLoading}
              placeholder={
                chatEnabled
                  ? 'Send a message...'
                  : 'Upload a PDF to start chatting...'
              }
            />
          </>
        ) : (
          <UploadPage onUploadSuccess={handleUploadSuccess} />
        )}
      </div>
    </div>
  )
}

export default HomePage
