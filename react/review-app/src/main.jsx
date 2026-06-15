import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App.jsx'
import { FeedbackProvider } from './context/FeedbackContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <FeedbackProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FeedbackProvider>,
)
