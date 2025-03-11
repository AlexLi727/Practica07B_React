import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import DynamicForm from './components/comp_formularios/dynamicForm.tsx';
import academicEvalutaion from "../src/assets/Json_data/academicEvaluation.json";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DynamicForm />
  </StrictMode>,
)
