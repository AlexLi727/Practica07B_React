/*
* Generación del componente DynamicForm
* Este componente recibe un objeto de tipo Formulario 
* y genera un formulario dinámico
*/
import React, { useState, useEffect } from 'react';

import academicEvaluation from "../../assets/Json_data/academicEvaluation.json"; // Importa el JSON de evaluación académica
import filmSurvey from "../../assets/Json_data/filmSurvey.json";
import technologySurvey from "../../assets/Json_data/technologySurvey.json";
import userData from "../../assets/Json_data/userData.json";
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

const DynamicForm: React.FC<DynamicFormProps> = () => {
    const [form, setForm] = useState(0);
    const [cargando, setCargando] = useState(true);
    

    // Devuelve un formulario dependiendo del valor del estado "form"
    const changeForm = () => {
        switch (form) {
            case 0:
                return academicEvaluation[0];
            case 1:
                return userData[0];
            case 2:
                return technologySurvey[0];
            case 3:
                return filmSurvey[0];
            default:
                return filmSurvey[0];
        }
    };

    // Devuelve un Record con claves como id de las preguntas y valores vacios
    const changeSetFormData = () => { 
        const initialData: Record<string, string | string[]> = {};
        changeForm().preguntas.forEach(pregunta => {
            initialData[pregunta.id] = pregunta.respuesta || (pregunta.tipo === 'check' ? [] : '');
        });
        return initialData;
    };
    const [formData, setFormData] = useState(changeSetFormData);

    //Estado para manejar errores
    const [errores, setErrores] = useState<Record<string, string>>({});

    /**
     * Funcion handleChange que se ejecutara a medida que el usuario vaya rellenando el formulario 
     * @param id 
     * @param value 
     */
    const handleChange = (id: string, value: string | string[]) => {
        //Actualiza el estado de formData con la nueva respuesta
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        //En funcion de la ID de la pregunta, se aplican las validaciones correspondientes
        //En este caso, se valida que el campo nombre solo contenga letras y espacios
        if (id == 'nombre') {
            const regex = /^[a-zA-Z\s]*$/;
            if (!regex.test(value as string)) {
                setErrores(prev => ({
                    ...prev,
                    [id]: 'Solo se permiten letras y espacios'
                }));
            } else {
                setErrores(prev => ({
                    ...prev,
                    [id]: ''
                }));
            }
            //En este caso, se valida que el campo contenga una fecha válida
        } else if (id === 'fecha_nacimiento') {
            const regex = /^\d{2}\/\d{2}\/\d{4}$/;
            if (!regex.test(value as string)) {
                setErrores(prev => ({
                    ...prev,
                    [id]: 'Formato de fecha incorrecto. Debe ser dd/mm/yyyy'
                }));
            } else {
                setErrores(prev => ({
                    ...prev,
                    [id]: ''
                }));
            }
            //En este caso, se valida que el campo contenga un email válido acabado en @stucom.com
        } else if (id === 'email') {
            const regex = /^[a-zA-Z0-9._%+-]+@stucom\.com$/;
            if (!regex.test(value as string)) {
                setErrores(prev => ({
                    ...prev,
                    [id]: 'Formato de email incorrecto'
                }));
            } else {
                setErrores(prev => ({
                    ...prev,
                    [id]: ''
                }));
            }
        }
    };
    /**
     * Funcion handleSubmit que ejecutara las validaciones unicamente al enviar el formulario
     * @param e 
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data:', formData);  

        // Aquí puedes manejar el envío de datos
        const newErrors: Record<string, string> = {};
        let isValid = true;

        // Validar todos los campos check requeridos
        changeForm().preguntas.forEach(pregunta => {
            if (pregunta.tipo === 'check' && pregunta.requerido) {
                const value = formData[pregunta.id] as string[];
                if (value.length === 0) {
                    newErrors[pregunta.id] = 'Una selección obligatoria';
                    isValid = false;
                }
            }
        });

        setErrores(newErrors);

        
        /*
        * Se ejecuta luego de un submit y comprobando que los datos introducidos en los formularios sean válidos
        * Recoge el valor de los formularios y lo almacena en localStorage
        */
        if (isValid) {
            changeForm().preguntas.forEach(pregunta => {
                const value = formData[pregunta.id] as string;
                if(Array.isArray(value)){
                    var count = 0;
                    value.forEach(respuesta => {
                        localStorage.setItem(pregunta.id + count, respuesta);
                        count++;
                    })
                }else{
                    localStorage.setItem(pregunta.id, value)
                }
                
            })
            setCargando(true);
            setForm(form + 1);
        }

    };
    /*
    * Se ejecuta al cambiar de formulario
    * Cambia el json que contiene los datos del formulario
    * Al terminar cambia el estado de la pantalla de carga
    */  
    useEffect(() => {
        setFormData(changeSetFormData);
        setCargando(false);
       }, [form])

    if(form > 3){
        return (
            <div>
                <h1> Manolo de la fuente </h1>
            </div>
        )
    }
    
    /*
    * Devuelve una pantalla de carga si los datos de los states no estan cargados
    */   
    if(cargando){
        return "Cargando componente"
    }

    
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
                <h2>{changeForm().titulo}</h2>
                <hr />
                {changeForm().preguntas.map(pregunta => {
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
                                    {errores[pregunta.id] && (
                                        <span className="text-danger">{errores[pregunta.id]}</span>
                                    )}
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
                <button type="submit" className="btn btn-lg">Enviar</button>
            </form>
        </div>
    );
};

export default DynamicForm;//Exporta el componente DynamicForm