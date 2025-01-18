import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartContextProvider } from './context.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartContextProvider>
     
        <App />
     
    </CartContextProvider>
  </StrictMode>,
)
