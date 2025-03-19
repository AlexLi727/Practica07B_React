/*
* Componente Card
* Este componente muestra una introducción al cuestionario y explica cómo funciona.
*/

import React from "react";
import { useTranslation } from "react-i18next"; // Importa el hook de traducción.
import "./Card.css"; // Importa los estilos del Card.
import Button from "../Button/button"; // Importa el componente de botón.

/*
* Componente funcional Card
* Muestra instrucciones sobre cómo usar el cuestionario.
*/
const Card: React.FC = () => {
  const { t } = useTranslation(); // Obtiene la función de traducción.

  return (
    <section className="card">
      {/* Título traducido dinámicamente */}
      <h3 className="title">{t("card.title")}</h3>
      <p className="content">{t("card.content")}</p>

      {/* Sección que explica cómo funciona el cuestionario */}
      <h4>{t("card.how_it_works")}</h4>
      <ul>
        <li>{t("card.steps.step1")}</li>
        <li>{t("card.steps.step2")}</li>
      </ul>

      {/* Sección que describe las categorías del cuestionario */}
      <h4>{t("card.sections")}</h4>
      <ul>
        <li>{t("card.categories.personal_info")}</li>
        <li>{t("card.categories.academic_evaluation")}</li>
        <li>{t("card.categories.technology")}</li>
        <li>{t("card.categories.movies")}</li>
      </ul>

      {/* Sección que menciona los requisitos para completar el cuestionario */}
      <h4>{t("card.requirements")}</h4>
      <ul>
        <li>{t("card.rules.rule1")}</li>
        <li>{t("card.rules.rule2")}</li>
        <li>{t("card.rules.rule3")}</li>
      </ul>

      {/* Mensaje final con un consejo */}
      <p>{t("card.advice")}</p>

      {/* Botón para comenzar el cuestionario */}
      <Button action={t("card.start_button")} />
    </section>
  );
};

export default Card; // Exporta el componente Card.
