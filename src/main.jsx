import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './Context/ThemeContext.jsx'
import { JwtProvider } from './Context/JwtContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <JwtProvider>
        <App />
      </JwtProvider>
    </ThemeProvider>
  </StrictMode>,
)
