import PdfUpload from '../components/PdfUpload'
import { uploadPdf } from '../services/uploadService'

function UploadPage({ onUploadSuccess }) {
  async function handleUpload(file) {
    const data = await uploadPdf(file)
    onUploadSuccess(data)
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-semibold text-gray-900">
          Upload a document
        </h2>
        <p className="max-w-md text-sm text-gray-500">
          Add a PDF to your knowledge base. Once uploaded, you can ask questions
          about its contents in the chat.
        </p>
      </div>

      <PdfUpload onUpload={handleUpload} />
    </div>
  )
}

export default UploadPage
