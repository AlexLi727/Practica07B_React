/*
* Configuración de i18n para la internacionalización en React
* Se utilizan:
* - i18next: biblioteca principal de traducción.
* - react-i18next: integración de i18next con React.
* - i18next-http-backend: carga de archivos JSON de traducción.
* - i18next-browser-languagedetector: detección automática del idioma del navegador.
*/

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // Carga los archivos de traducción desde una ubicación externa.
  .use(LanguageDetector) // Detecta automáticamente el idioma del navegador.
  .use(initReactI18next) // Integra i18next con React.
  .init({
    fallbackLng: "es", // Idioma por defecto si no se detecta otro.
    lng: "es", // Se inicializa en español por defecto.
    debug: true, // Habilita logs en consola para depuración.
    interpolation: {
      escapeValue: false, // React ya maneja la seguridad contra XSS.
    },
    backend: {
      loadPath: "/lang/{{lng}}/translation.json", // Ruta donde se encuentran los archivos de traducción.
    },
  });

export default i18n; // Exporta la configuración para ser utilizada en toda la aplicación.
