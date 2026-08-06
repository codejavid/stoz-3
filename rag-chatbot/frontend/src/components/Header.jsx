function Header({ onToggleSidebar }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-4">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
        aria-label="Toggle sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <h1 className="text-base font-semibold text-gray-900">RAG Chatbot</h1>
    </header>
  )
}

export default Header
