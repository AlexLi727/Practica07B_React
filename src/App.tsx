import React from 'react';
import DynamicForm from '../src/components/comp_formularios/dynamicForm'; // Asegúrate de que la ruta sea correcta
import academicEvaluation from '../src/assets/Json_data/academicEvaluation.json'; // Importa el JSON de evaluación académica
import filmSurvey from '../src/assets/Json_data/filmSurvey.json'; // Importa el JSON de encuesta de cine
import technologySurvey from '../src/assets/Json_data/technologySurvey.json'; // Importa el JSON de encuesta de tecnología
import userData from '../src/assets/Json_data/userData.json'; // Importa el JSON de datos del usuario

const App: React.FC = () => {
    return (
        <div>
            {/* Renderiza el formulario de evaluación académica */}
            <DynamicForm data={academicEvaluation[0]} />
            {/* Renderiza el formulario de encuesta de cine */}
            <DynamicForm data={filmSurvey[0]} />
            {/* Renderiza el formulario de encuesta de tecnología */}
            <DynamicForm data={technologySurvey[0]} />
            {/* Renderiza el formulario de datos del usuario */}
            <DynamicForm data={userData[0]} />
        </div>
    );
};

export default App;