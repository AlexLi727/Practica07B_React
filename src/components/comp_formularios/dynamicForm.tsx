import React, { useState } from 'react';
import academicEvaluation from "../../assets/Json_data/academicEvaluation.json"; // Importa el JSON de evaluación académica
import filmSurvey from "../../assets/Json_data/filmSurvey.json";
import technologySurvey from "../../assets/Json_data/technologySurvey.json";
import userData from "../../assets/Json_data/userData.json";

interface Pregunta {
    id: string;
    tipo: 'textarea' | 'select' | 'check' | 'text' | string;
    pregunta: string;
    respuesta: string | string[];
    opciones?: string[];
    restricciones?: {
        min?: number;
        max?: number;
    };
    validacion?:{
        max_seleccionados?: number;
        min_edad?: number;
        formato?: string;
        dominio?: string;
    };
}

interface Formulario {
    titulo: string;
    preguntas: Pregunta[];
}

interface DynamicFormProps {
    data: Formulario;
}

const DynamicForm: React.FC = () => {
    const [form, setForm] = useState(0);

    const changeForm = () => {
        switch(form){
            case 0:
                return academicEvaluation[0];
            case 1:
                console.log("1");
                return filmSurvey[0];
            case 2:
                console.log("2");
                return technologySurvey[0];
            case 3:
                console.log("3");
                return userData[0];
            default:
                return academicEvaluation[0];
        }
    };

    const [formData, setFormData] = useState(() => { 
        const initialData: Record<string, string | string[]> = {};
        changeForm().preguntas.forEach(pregunta => {
            initialData[pregunta.id] = pregunta.respuesta || (pregunta.tipo === 'check' ? [] : '');
        });
        return initialData;
    }
    );


    const handleChange = (id: string, value: string | string[]) => {
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        console.log(form);
        setForm(form+1);
        // Aquí puedes manejar el envío de datos
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{changeForm().titulo}</h2>
            {changeForm().preguntas.map(pregunta => {
                switch (pregunta.tipo) {
                    case 'textarea':
                        return (
                            <div key={pregunta.id}>
                                <label>{pregunta.pregunta}</label>
                                <textarea
                                    value={formData[pregunta.id] as string}
                                    onChange={(e) => handleChange(pregunta.id, e.target.value)}
                                    minLength={pregunta.restricciones?.min}
                                    maxLength={pregunta.restricciones?.max}
                                />
                            </div>
                        );
                    case 'select':
                        return (
                            <div key={pregunta.id}>
                                <label>{pregunta.pregunta}</label>
                                <select
                                    value={formData[pregunta.id] as string}
                                    onChange={(e) => handleChange(pregunta.id, e.target.value)}
                                >
                                    {pregunta.opciones?.map(opcion => (
                                        <option key={opcion} value={opcion}>{opcion}</option>
                                    ))}
                                </select>
                            </div>
                        );
                    case 'check':
                        return (
                            <div key={pregunta.id}>
                                <label>{pregunta.pregunta}</label>
                                {pregunta.opciones?.map(opcion => (
                                    <div key={opcion}>
                                        <input
                                            type="checkbox"
                                            
                                            //checked={(formData[pregunta.id] as string[]).includes(opcion)}
                                            onChange={(e) => {
                                                const newValue = e.target.checked
                                                    ? [...(formData[pregunta.id] as string[]), opcion]
                                                    : (formData[pregunta.id] as string[]).filter(o => o !== opcion);
                                                if (pregunta.validacion?.max_seleccionados) {
                                                    console.log(pregunta.validacion.max_seleccionados);
                                                    if (newValue.length <= pregunta.validacion.max_seleccionados) {
                                                        handleChange(pregunta.id, newValue);
                                                    }
                                                    if (newValue.length == pregunta.validacion.max_seleccionados){
                                                        this.disabled="true"
                                                    }
                                                } else {
                                                    handleChange(pregunta.id, newValue);
                                                }
                                            }}
                                            
                                        />
                                        {opcion}
                                    </div>
                                ))}
                            </div>
                        );
                    default:
                        return null;
                }
            })}
            <button type="submit">Enviar</button>
       </form>
    );
};

export default DynamicForm;