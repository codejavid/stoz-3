function Sidebar({ isOpen, onClose, activeView, onNavigate, chatEnabled }) {
  const historyItems = ['Getting started', 'Document Q&A', 'Summarize text']

  const navItems = [
    { id: 'upload', label: 'Upload PDF', icon: '📄' },
    { id: 'chat', label: 'Chat', icon: '💬', requiresUpload: true },
  ]

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r border-gray-800 bg-gray-900 transition-all duration-200 md:static ${
          isOpen
            ? 'w-64 translate-x-0'
            : '-translate-x-full md:w-16 md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-4 md:justify-center">
          <button
            type="button"
            onClick={() => chatEnabled && onNavigate('chat')}
            disabled={!chatEnabled}
            className="flex w-full items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-200 transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
          >
            <span className="text-lg leading-none">+</span>
            <span className={isOpen ? 'inline md:inline' : 'hidden md:hidden'}>
              New chat
            </span>
          </button>
        </div>

        <nav className="space-y-1 px-3 py-2">
          {navItems.map((item) => {
            const isDisabled = item.requiresUpload && !chatEnabled

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => !isDisabled && onNavigate(item.id)}
                disabled={isDisabled}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  activeView === item.id
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''} ${
                  isOpen ? '' : 'justify-center md:justify-center'
                }`}
                title={item.label}
              >
                <span>{item.icon}</span>
                <span className={isOpen ? 'inline' : 'hidden md:hidden'}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <p
            className={`mb-2 px-3 text-xs font-medium uppercase tracking-wide text-gray-500 ${
              isOpen ? 'block' : 'hidden md:hidden'
            }`}
          >
            Recent
          </p>
          <ul className="space-y-1">
            {historyItems.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className={`w-full truncate rounded-lg px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-gray-800 ${
                    isOpen ? 'block' : 'hidden md:hidden'
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-800 p-4">
          <p
            className={`truncate text-xs text-gray-500 ${
              isOpen ? 'block' : 'hidden md:hidden'
            }`}
          >
            RAG Chatbot v1.0
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
