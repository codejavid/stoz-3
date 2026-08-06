function UserAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white">
      You
    </div>
  )
}

function AiAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm">
      ✨
    </div>
  )
}

function ErrorAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm">
      ⚠️
    </div>
  )
}

function ChatMessage({ role, content }) {
  const isUser = role === 'user'
  const isError = role === 'error'

  return (
    <div
      className={`flex w-full gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {isUser && <UserAvatar />}
      {!isUser && !isError && <AiAvatar />}
      {isError && <ErrorAvatar />}

      <div
        className={`flex max-w-[80%] flex-col sm:max-w-[70%] ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
            isUser
              ? 'rounded-br-md bg-gray-900 text-white'
              : isError
                ? 'rounded-bl-md border border-red-200 bg-red-50 text-red-700'
                : 'rounded-bl-md border border-gray-100 bg-white text-gray-800'
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
