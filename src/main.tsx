import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CompPruebajeisons from './components/comp_pruebajeisons.tsx' // Update the component name to start with an uppercase letter
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
