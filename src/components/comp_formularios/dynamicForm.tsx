import React, { useEffect, useState } from 'react';

import academicEvaluation from "../../assets/Json_data/academicEvaluation.json";
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
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<Record<string, string | string[]>>({});

    // Lista de formularios disponibles
    const formularios = [academicEvaluation[0], userData[0], technologySurvey[0], filmSurvey[0]];

    // Devuelve el formulario correspondiente al estado actual
    const changeForm = () => formularios[form] || filmSurvey[0];

    // Funciones de utilidad para guardar y leer localStorage con soporte a arrays (JSON)
    const guardarEnLocalStorage = (key: string, value: string | string[]) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const leerDeLocalStorage = (key: string): string | string[] | null => {
        const value = localStorage.getItem(key);
        try {
            return value ? JSON.parse(value) : null;
        } catch {
            return value;
        }
    };

    // Elimina del localStorage las claves relacionadas al formulario actual
    const limpiarLocalStorageDelFormulario = () => {
        changeForm().preguntas.forEach(p => {
            localStorage.removeItem(p.id);
        });
        setFormData(inicializarFormData()); // Reinicia los datos en pantalla
        setErrores({}); // Limpia los errores visuales
    };

    // Devuelve un Record con claves como id de las preguntas y valores iniciales o recuperados
    const inicializarFormData = () => {
        const initial: Record<string, string | string[]> = {};
        changeForm().preguntas.forEach(p => {
            const stored = leerDeLocalStorage(p.id);
            if (stored !== null) {
                initial[p.id] = stored;
            } else {
                initial[p.id] = p.tipo === 'check' ? [] : '';
            }
        });
        return initial;
    };

    /*
    * Se ejecuta al cambiar de formulario
    * Cambia el json que contiene los datos del formulario
    * Al terminar cambia el estado de la pantalla de carga
    * Y recupera los datos almacenados (si los hay) desde localStorage
    */
    useEffect(() => {
        setFormData(inicializarFormData());
        setCargando(false);
    }, [form]);

    /**
     * Funcion handleChange que se ejecutara a medida que el usuario vaya rellenando el formulario 
     * @param id 
     * @param value 
     */
    const handleChange = (id: string, value: string | string[]) => {
        setFormData(prev => ({ ...prev, [id]: value }));

        // Validaciones personalizadas
        if (id === 'nombre') {
            const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
            setErrores(prev => ({ ...prev, [id]: regex.test(value as string) ? '' : 'Solo se permiten letras y espacios' }));
        } else if (id === 'fecha_nacimiento') {
            const regex = /^\d{2}\/\d{2}\/\d{4}$/;
            setErrores(prev => ({ ...prev, [id]: regex.test(value as string) ? '' : 'Formato de fecha incorrecto. Debe ser dd/mm/yyyy' }));
        } else if (id === 'email') {
            const regex = /^[a-zA-Z0-9._%+-]+@stucom\.com$/;
            setErrores(prev => ({ ...prev, [id]: regex.test(value as string) ? '' : 'Formato de email incorrecto' }));
        }
    };

    /**
     * Funcion handleSubmit que ejecutara las validaciones unicamente al enviar el formulario
     * @param e 
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        const newErrors: Record<string, string> = {};
        let isValid = true;

        // Validar todos los campos check requeridos
        changeForm().preguntas.forEach(pregunta => {
            if (pregunta.tipo === 'check' && pregunta.requerido) {
                const value = formData[pregunta.id] as string[];
                if (!value || value.length === 0) {
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
            changeForm().preguntas.forEach(p => {
                guardarEnLocalStorage(p.id, formData[p.id]);
            });
            setCargando(true);
            setForm(form + 1);
        }
    };

    //Funcion para cambiar de la pagina de respuestas al formulario
    const restartForm = () => {
        formularios.forEach(f => {
            f.preguntas.forEach(p => {
                localStorage.removeItem(p.id);
            });
        });
        setForm(0);
        setCargando(true);
    };

    /*
    * Vista con los resultados
    */
    if (form > 3) {
        return (
            <section className="result">
                <h3 className="title">Resultados</h3>
                <hr />
                {formularios.map(f => (
                    <div key={f.titulo}>
                        <h3 className="sub-title">Resultados de: {f.titulo}</h3>
                        <ul>
                            {f.preguntas.map(p => {
                                const respuesta = leerDeLocalStorage(p.id);
                                if (Array.isArray(respuesta)) {
                                    return respuesta.map((r, i) => <li key={p.id + i}>{r}</li>);
                                } else {
                                    return <li key={p.id}>{respuesta}</li>;
                                }
                            })}
                        </ul>
                    </div>
                ))}
                <button onClick={restartForm}>Reiniciar formulario</button>
            </section>
        );
    }

    /*
    * Devuelve una pantalla de carga si los datos de los states no estan cargados
    */
    if (cargando) return <p>Cargando componente...</p>;

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
            <form onSubmit={handleSubmit} className="formulario-container">
                <h2>{changeForm().titulo}</h2>
                <hr />
                {changeForm().preguntas.map(p => {
                    switch (p.tipo) {
                        case 'textarea':
                            return (
                                <div className="mb-3" key={p.id}>
                                    <label>{p.pregunta}</label>
                                    <textarea
                                        value={formData[p.id] as string}
                                        onChange={(e) => handleChange(p.id, e.target.value)}
                                        minLength={p.restricciones?.min}
                                        maxLength={p.restricciones?.max}
                                        required
                                    />
                                    {errores[p.id] && <div className="text-danger">{errores[p.id]}</div>}
                                </div>
                            );
                        case 'select':
                            return (
                                <div className="mb-3" key={p.id}>
                                    <label>{p.pregunta}</label>
                                    <select
                                        value={formData[p.id] as string}
                                        onChange={(e) => handleChange(p.id, e.target.value)}
                                    >
                                        {p.opciones?.map(op => (
                                            <option key={op} value={op}>{op}</option>
                                        ))}
                                    </select>
                                    {errores[p.id] && <div className="text-danger">{errores[p.id]}</div>}
                                </div>
                            );
                        case 'check':
                            return (
                                <div className="mb-3" key={p.id}>
                                    <label>{p.pregunta}</label>
                                    {p.opciones?.map(op => {
                                        const seleccionados = formData[p.id] as string[];
                                        const checked = seleccionados.includes(op);
                                        return (
                                            <div key={op}>
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={(e) => {
                                                        let newSeleccion: string[] = checked
                                                            ? seleccionados.filter(val => val !== op)
                                                            : [...seleccionados, op];
                                                        if (p.validacion?.max_seleccionados && newSeleccion.length > p.validacion.max_seleccionados) {
                                                            return;
                                                        }
                                                        handleChange(p.id, newSeleccion);
                                                    }}
                                                />
                                                {op}
                                            </div>
                                        );
                                    })}
                                    {errores[p.id] && <div className="text-danger">{errores[p.id]}</div>}
                                </div>
                            );
                        case 'text':
                            return (
                                <div className="mb-3" key={p.id}>
                                    <label>{p.pregunta}</label>
                                    <input
                                        type="text"
                                        value={formData[p.id] as string}
                                        onChange={(e) => handleChange(p.id, e.target.value)}
                                        minLength={p.restricciones?.min}
                                        maxLength={p.restricciones?.max}
                                        required
                                    />
                                    {errores[p.id] && <div className="text-danger">{errores[p.id]}</div>}
                                </div>
                            );
                        default:
                            return null;
                    }
                })}
                {/* Botones: limpiar formulario actual + enviar */}
                <div className="button-group">
                    <button type="button" className="btn btn-secondary limpiar" onClick={limpiarLocalStorageDelFormulario}>
                        Limpiar este formulario
                    </button>
                    <button type="submit" className="btn btn-lg enviar">Enviar</button>
                </div>
            </form>
        </div>
    );
};

export default DynamicForm; //Exporta el componente DynamicForm
