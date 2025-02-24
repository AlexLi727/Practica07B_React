import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CompPruebajeisons from './components/comp_pruebajeisons.tsx' // Update the component name to start with an uppercase letter
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <CompPruebajeisons /> // Use the component as a JSX element
  </StrictMode>,
)
