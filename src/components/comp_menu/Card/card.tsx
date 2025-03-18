import React from "react";
import "./Card.css";
import Button from "../Button/button";

const Card: React.FC = () => {
  return (
    <section className="card">
      <h3 className="title">¡Bienvenid@ a Quizly! 🎉</h3>
      <p className="content">
        Gracias por participar en esta experiencia. A continuación, te guiaremos a través de una serie de formularios diseñados para conocerte mejor. 
        El proceso es sencillo y se divide en varias secciones que deberás completar en orden.
      </p>

      <h4>¿Cómo funciona?</h4>
      <ul>
        <li>📌 Paso 1: Iniciarás en una página de bienvenida donde podrás familiarizarte con el proceso.</li>
        <li>📌 Paso 2: Completarás distintos formularios uno tras otro, cada uno con preguntas específicas sobre diferentes áreas.</li>
        <li>📌 Paso 3: Al finalizar, recibirás un resumen con todas tus respuestas.</li>
      </ul>

      <h4>Secciones del formulario</h4>
      <ul>
        <li>📝 Información personal: Queremos conocerte mejor, por lo que te pediremos algunos datos generales.</li>
        <li>📚 Evaluación académica: Cuéntanos sobre tu formación y experiencia educativa.</li>
        <li>💻 Tecnología: Descubramos juntos tu nivel de afinidad con herramientas digitales y tecnología en general.</li>
        <li>🎬 Cine: ¿Qué tipo de películas disfrutas? Queremos conocer tus gustos cinematográficos.</li>
      </ul>

      <h4>Requisitos para completar los formularios</h4>
      <ul>
        <li>✅ Completa todos los campos requeridos en cada formulario antes de avanzar al siguiente.</li>
        <li>✅ Si un campo no es válido o está incompleto, recibirás un mensaje de error para corregirlo antes de continuar.</li>
        <li>✅ Una vez que completes todas las secciones, verás un resumen final con tus respuestas.</li>
      </ul>

      <p>💡 Consejo: Tómate tu tiempo para responder con sinceridad. No hay respuestas correctas o incorrectas, ¡solo queremos conocerte mejor!</p>
    <Button action="¡Comenzar!"/>
      
    </section>
  );
};

export default Card;
