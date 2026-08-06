import api from './api'

const FILE_ID_KEY = 'file_id'

export function getStoredFileId() {
  return localStorage.getItem(FILE_ID_KEY)
}

export function saveFileId(fileId) {
  localStorage.setItem(FILE_ID_KEY, fileId)
}

export async function uploadPdf(file) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    if (response.data.Error) {
      throw new Error(response.data.Error)
    }

    return response.data
  } catch (error) {
    if (error.response?.data?.Error) {
      throw new Error(error.response.data.Error)
    }

    if (error.response?.data?.detail) {
      const detail = error.response.data.detail
      throw new Error(typeof detail === 'string' ? detail : 'Upload failed.')
    }

    if (error.request && !error.response) {
      throw new Error(
        'Could not connect to the server. Make sure the backend is running.',
      )
    }

    throw error
  }
}
