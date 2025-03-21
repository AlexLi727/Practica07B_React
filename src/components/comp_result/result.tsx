import React from 'react';
import "./result.css";



const result: React.FC = () => {
    return (
        <section className="result">
            <h3 className="title">Resultados</h3>
            <hr />
            <div className='academicEvaluation'>
                <h3 className='sub-title'>Resultados de la Evaluacion Academica:</h3>
                <ul>
                    <li>Name: Antonio</li>
                    <li>Nota: 0</li>
                </ul>
            </div>
            <div className='filmSurvey'>
                <h3 className='sub-title'>Resultados de Preferencias de Cine:</h3>
                <ul>
                    <li>Cine: absolute cinema</li>
                    <li>Genero: drama</li>
                </ul>
            </div>
            <div className='technologySurvey'>
                <h3 className='sub-title'>Resultados de Preferencias en Tecnología</h3>
                <ul>
                    <li>si</li>
                </ul>
            </div>
            <div className='userData'>
                <h3 className='sub-title'>Resultados de Datos del Usuario</h3>
                <ul>
                    <li>DNI: dsabhfbvdhksfchsd3</li>
                    <li>Genero: No</li>
                </ul>
            </div>
        </section>
    );
};

export default result;