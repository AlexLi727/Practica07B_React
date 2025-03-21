import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import "bootstrap/dist/css/bootstrap.min.css";
import './i18n';
import Result from './components/comp_result/result';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <Result />
  </StrictMode>,
)
