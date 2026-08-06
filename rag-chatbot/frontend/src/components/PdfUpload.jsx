import { useRef, useState } from 'react'

const PDF_ACCEPT = '.pdf,application/pdf'

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin text-white"
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
  )
}

function PdfIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  )
}

function isPdfFile(file) {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Reusable PDF upload component with drag-and-drop support.
 *
 * @param {Object} props
 * @param {(file: File) => Promise<void>} [props.onUpload] - Called when upload is triggered
 * @param {string} [props.className] - Optional wrapper class names
 */
function PdfUpload({ onUpload, className = '' }) {
  const inputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleFileSelect(file) {
    if (!isPdfFile(file)) {
      setError('Only PDF files are allowed.')
      setSelectedFile(null)
      return
    }

    setError('')
    setSuccess(false)
    setSelectedFile(file)
  }

  function handleInputChange(event) {
    const file = event.target.files?.[0]
    if (file) handleFileSelect(file)
    event.target.value = ''
  }

  function handleDragOver(event) {
    event.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(event) {
    event.preventDefault()
    setIsDragging(false)
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files?.[0]
    if (file) handleFileSelect(file)
  }

  function handleBrowseClick() {
    inputRef.current?.click()
  }

  function handleRemoveFile() {
    setSelectedFile(null)
    setError('')
    setSuccess(false)
  }

  async function handleUpload() {
    if (!selectedFile || isUploading) return

    setIsUploading(true)
    setError('')
    setSuccess(false)

    try {
      if (onUpload) {
        await onUpload(selectedFile)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }

      setSuccess(true)
      setSelectedFile(null)
    } catch (err) {
      setError(
        err.message || 'Upload failed. Please try again.',
      )
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className={`w-full max-w-lg ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept={PDF_ACCEPT}
        onChange={handleInputChange}
        className="hidden"
        aria-hidden="true"
      />

      <div
        role="button"
        tabIndex={0}
        onClick={handleBrowseClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleBrowseClick()
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
          isDragging
            ? 'border-gray-900 bg-gray-50'
            : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
        }`}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <PdfIcon className="h-7 w-7 text-red-500" />
        </div>

        <p className="mb-1 text-sm font-medium text-gray-900">
          {isDragging ? 'Drop your PDF here' : 'Drag and drop your PDF'}
        </p>

        <p className="text-sm text-gray-500">
          or{' '}
          <span className="font-medium text-gray-900 underline underline-offset-2">
            click to browse
          </span>
        </p>

        <p className="mt-3 text-xs text-gray-400">PDF files only</p>
      </div>

      {selectedFile && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100">
            <PdfIcon className="h-5 w-5 text-red-500" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">
              {selectedFile.name}
            </p>
            <p className="text-xs text-gray-500">
              {formatFileSize(selectedFile.size)}
            </p>
          </div>

          {!isUploading && (
            <button
              type="button"
              onClick={handleRemoveFile}
              className="shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-200 hover:text-gray-600"
              aria-label="Remove file"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {success && (
        <p className="mt-3 text-sm text-green-600" role="status">
          PDF uploaded successfully!
        </p>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {isUploading ? (
          <>
            <Spinner />
            Uploading...
          </>
        ) : (
          'Upload PDF'
        )}
      </button>
    </div>
  )
}

export default PdfUpload
