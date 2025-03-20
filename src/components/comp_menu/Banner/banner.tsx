/*
* Componente Banner
* Este componente muestra el título de la aplicación y un selector de idioma.
*/

import React from "react";
import { useTranslation } from "react-i18next"; // Importa el hook de traducción.
import "./Banner.css"; // Importa los estilos del banner.

/*
* Interfaz para las propiedades del Banner
* title: título que se mostrará en el banner.
*/
interface BannerProps {
  title: string;
}

/*
* Componente funcional Banner
* Contiene un enlace a la página de inicio y un selector de idioma.
*/
const Banner: React.FC<BannerProps> = ({ title }) => {
  const { t, i18n } = useTranslation(); // Obtiene la función de traducción y el objeto i18n.

  /*
  * Maneja el cambio de idioma cuando el usuario selecciona una opción en el <select>.
  * Parámetros:
  * - event: evento del cambio de selección.
  */
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value); // Cambia el idioma en la aplicación.
  };

  return (
    <header className="banner">
      {/* Enlace traducido dinámicamente */}
      <a href="/">{t("banner.home")}</a>

      {/* Título del banner recibido como prop */}
      <h1 className="banner-title">{title}</h1>

      {/* Selector de idioma con un icono de globo */}
      <div className="banner-lang">
        <i className="fas fa-globe"></i> {/* Icono de cambio de idioma */}
        <select
          name="lang"
          id="lang"
          onChange={handleLanguageChange} // Maneja el cambio de idioma.
          value={i18n.language} // Mantiene el idioma seleccionado.
        >
          <option value="es">Español</option> {/* Opción para español */}
          <option value="en">English</option> {/* Opción para inglés */}
        </select>
      </div>
    </header>
  );
};

export default Banner; // Exporta el componente Banner.
