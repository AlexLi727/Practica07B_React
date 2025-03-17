/*
* Generación del componente DynamicForm
* Este componente recibe un objeto de tipo Formulario 
* y genera un formulario dinámico
*/
import React, { useState } from 'react';
import './dynamicForm.css';

/*
* Interfaz de una pregunta
* id: identificador único de la pregunta
* tipo: tipo de pregunta (textarea, select, check, text, string)
* pregunta: texto de la pregunta
* respuesta: respuesta de la pregunta
* opciones: opciones de respuesta (select y check)
* restricciones: restricciones de la respuesta (mín y máx de caracteres)
*/
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
    /*
    * Validaciones adicionales
    * max_seleccionados: número máximo de opciones seleccionadas (check)
    * min_edad: edad mínima (number)
    * formato: formato de la respuesta (string)
    * dominio: dominio de la respuesta (string)
    */
    validacion?: {
        max_seleccionados?: number;
        min_edad?: number;
        formato?: string;
        dominio?: string;
    };
    //propiedad para validar los checkbox
    requerido?: boolean;
}

/*
* Interfaz de un formulario
* titulo: título del formulario
* preguntas: preguntas del formulario
*/
interface Formulario {
    titulo: string;
    preguntas: Pregunta[];
}

/*
* Interfaz del componente DynamicForm
* data: objeto de tipo Formulario para
* generar el formulario dinámico
*/
interface DynamicFormProps {
    data: Formulario;
}

/*
* Componente DynamicForm
* Genera un formulario dinámico a partir de un objeto de tipo Formulario
*/
const DynamicForm: React.FC<DynamicFormProps> = ({ data }) => {
    const [formData, setFormData] = useState(() => {
        //Inicializa el objeto de datos del formulario
        const initialData: Record<string, string | string[]> = {};
        data.preguntas.forEach(pregunta => {//Recorre las preguntas del formulario
            //Inicializa la respuesta de la pregunta
            initialData[pregunta.id] = pregunta.respuesta || (pregunta.tipo === 'check' ? [] : '');
        });
        return initialData;
    });
    //Estado para manejar errores
    const [errores, setErrores] = useState<Record<string, string>>({});

    //handleChange: función para manejar los cambios en las respuestas
    const handleChange = (id: string, value: string | string[]) => {
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        //validar al cambiar
        const pregunta = data.preguntas.find(p => p.id === 'id');
        if (pregunta?.tipo === 'check' && pregunta?.requerido) {
            if (Array.isArray(value) && value.length === 0) {
                setErrores(prev => ({
                    ...prev,
                    [id]: 'Una selección obligatoria'
                }));
            } else {
                setErrores(prev => ({
                    ...prev,
                    [id]: ''
                }));
            }
        }
    };



    //handleSubmit: función para manejar el envío de datos
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //validar todos los campos check requeridos
        const newErrors: Record<string, string> = {};
        let isValid = true;
        data.preguntas.forEach(pregunta => {
            if (pregunta.tipo === 'check' && pregunta.requerido) {
                const value = formData[pregunta.id] as string[];
                if (value.length === 0) {
                    newErrors[pregunta.id] = 'Una selección obligatoria';
                    isValid = false;
                }
            }
        });
        setErrores(newErrors);
        if (isValid) {
            console.log('Form Data:', formData);
        } else {
            alert('Debes seleccionar un checkbox');
        }
        // Aquí puedes manejar el envío de datos
    };
    /*
    * Genera el formulario dinámico
    * Recorre las preguntas del formulario y genera los campos correspondientes
    * textarea: campo de texto
    * select: lista desplegable
    * check: casillas de verificación
    * Al enviar el formulario, se muestra en consola el objeto formData
    * con las respuestas del formulario
    */
    return (
        <div className="container d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
                <h2>{data.titulo}</h2>
                <hr />
                {data.preguntas.map(pregunta => {
                    switch (pregunta.tipo) {
                        case 'textarea':
                            return (
                                <div className="mb-3" key={pregunta.id}>
                                    <label>{pregunta.pregunta}</label>
                                    <textarea
                                        value={formData[pregunta.id] as string}
                                        onChange={(e) => handleChange(pregunta.id, e.target.value)}
                                        minLength={pregunta.restricciones?.min}
                                        maxLength={pregunta.restricciones?.max}
                                        required />
                                </div>
                            );
                        case 'select':
                            return (
                                <div className="mb-3" key={pregunta.id}>
                                    <label>{pregunta.pregunta}</label>
                                    <select className="mx-3 my-3"
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
                                <div className="mb-3" key={pregunta.id}>
                                    <label>{pregunta.pregunta}</label>
                                    {pregunta.opciones?.map(opcion => (
                                        <div key={opcion}>
                                            <input className="form-check-input mx-3"
                                                type="checkbox"
                                                checked={(formData[pregunta.id] as string[]).includes(opcion)}
                                                onChange={(e) => {
                                                    const newValue = e.target.checked
                                                        ? [...(formData[pregunta.id] as string[]), opcion]
                                                        : (formData[pregunta.id] as string[]).filter(o => o !== opcion);
                                                    if (pregunta.validacion?.max_seleccionados) {
                                                        if (newValue.length <= pregunta.validacion.max_seleccionados) {
                                                            handleChange(pregunta.id, newValue);
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
                        case 'text':
                            return (
                                <div className="mb-3" key={pregunta.id}>
                                    <label>{pregunta.pregunta}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData[pregunta.id] as string}
                                        onChange={(e) => handleChange(pregunta.id, e.target.value)}
                                        minLength={pregunta.restricciones?.min}
                                        maxLength={pregunta.restricciones?.max}
                                        required
                                    />
                                    {errores[pregunta.id] && (
                                        <span className="text-danger">{errores[pregunta.id]}</span>
                                    )}
                                </div>
                            );
                        default:
                            return null;
                    }
                })}
                <button type="submit" className="btn btn-success btn-lg">Enviar</button>
            </form>
        </div>
    );
};

export default DynamicForm;//Exporta el componente DynamicForm