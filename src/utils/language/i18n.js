import i18n from "i18next"
import {initReactI18next} from "react-i18next"
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"

i18n
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .use(Backend)
    .init({
        resources: {
          en: {
            translation: require("./locals/en/translation.json"),
          },
          ar: {
            translation: require("./locals/ar/translation.json"),
          },
          fr: {
            translation: require("./locals/fr/translation.json"),
          },
        },
        lng: "en", // set the default language
        fallbackLng: "en",
        keySeparator: false,
        interpolation: {
          escapeValue: false,
        },
      });

export default i18n