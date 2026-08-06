import api from './api'
import { getStoredFileId } from './uploadService'

function parseApiError(error) {
  if (error.response?.data?.detail) {
    const detail = error.response.data.detail
    if (typeof detail === 'string') return detail
    if (Array.isArray(detail)) {
      return detail.map((item) => item.msg).join(', ')
    }
  }

  if (error.response?.data?.message) {
    return error.response.data.message
  }

  if (error.request && !error.response) {
    return 'Could not connect to the server. Make sure the backend is running.'
  }

  return error.message || 'Something went wrong. Please try again.'
}

export async function sendChatMessage(question) {
  const fileId = getStoredFileId()

  if (!fileId) {
    throw new Error('No document found. Please upload a PDF first.')
  }

  try {
    const response = await api.post('/chat', {
      file_id: fileId,
      question,
    })

    return response.data
  } catch (error) {
    throw new Error(parseApiError(error))
  }
}
