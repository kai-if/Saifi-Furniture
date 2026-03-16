import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import "./styles/animations.css";
import { ThemeProvider } from './context/ThemeContext.jsx';
import { QuoteProvider } from './context/QuoteContext.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <QuoteProvider>
          <App />
        </QuoteProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
