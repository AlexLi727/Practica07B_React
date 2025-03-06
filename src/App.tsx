import { FaUser, FaGraduationCap, FaLaptopCode, FaFilm, FaCheckCircle } from "react-icons/fa";
import "./App.css";

function App() {
  return (
    <>
      {/* Título principal */}
      <h1 className="title">Encuestas Interactivas</h1>

      {/* Contenedor principal */}
      <div className="content">

        {/* Descripción de la encuesta */}
        <p className='description'>🎉¡Gracias por participar en nuestra encuesta!🎉</p>
        <p className="description"> En esta aplicación, completarás una serie de formularios diseñados para conocer mejor tus intereses y preferencias.</p>

        {/* Contenedor de secciones alineadas horizontalmente */}
        <div className="sections-container">

          {/* Sección: ¿Cómo funciona? */}
          <div className="section">
            <h2>¿Cómo funciona?</h2>
            <p>La encuesta consta de los siguientes formularios:</p>
            <ol>
              <li><FaUser className="icon" /> Información personal</li>
              <li><FaGraduationCap className="icon" /> Evaluación académica</li>
              <li><FaLaptopCode className="icon" /> Preferencias en tecnología</li>
              <li><FaFilm className="icon" /> Preferencias en cine</li>
            </ol>
          </div>

          {/* Sección: Reglas del proceso con íconos de check */}
          <div className="section">
            <h2>Reglas del proceso:</h2>
            <ul>
              <li><FaCheckCircle className="check-icon" /> Debes completar cada formulario en orden.</li>
              <li><FaCheckCircle className="check-icon" /> Solo puedes avanzar si todos los campos están completos.</li>
              <li><FaCheckCircle className="check-icon" /> Tu progreso se guardará automáticamente.</li>
            </ul>
          </div>

        </div>

        {/* Botón para iniciar la encuesta */}
        <button className='start'>Comenzar</button>
      </div>
    </>
  );
}

export default App;
