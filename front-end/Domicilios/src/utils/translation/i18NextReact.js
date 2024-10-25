import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation from "./translation";

i18n.use(initReactI18next).init({
  resources: translation,
  fallbackLng: "es",
  interpolation: {
    escapeValue: true,
  },
});

export default i18n;
