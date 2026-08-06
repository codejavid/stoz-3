function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled,
  isLoading = false,
  placeholder = 'Send a message...',
}) {
  const isDisabled = disabled || isLoading

  function handleSubmit(event) {
    event.preventDefault()
    if (!isDisabled && value.trim()) {
      onSubmit()
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (!isDisabled && value.trim()) {
        onSubmit()
      }
    }
  }

  return (
    <div className="shrink-0 border-t border-gray-200 bg-white px-4 py-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-gray-100"
      >
        <textarea
          rows={1}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? 'Waiting for AI response...' : placeholder}
          disabled={isDisabled}
          className="max-h-32 min-h-[24px] flex-1 resize-none bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={isDisabled || !value.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          aria-label="Send message"
        >
          {isLoading ? (
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          )}
        </button>
      </form>

      <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-gray-400">
        Press Enter to send, Shift+Enter for a new line
      </p>
    </div>
  )
}

export default ChatInput
