import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PhoneFrame, { shouldFrame } from './PhoneFrame'
import './index.css'

// Di desktop, tampilkan aplikasi di dalam bingkai iPhone Pro Max.
// Di HP asli / di dalam bingkai (iframe), render aplikasi apa adanya.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {shouldFrame() ? <PhoneFrame /> : <App />}
  </React.StrictMode>,
)
