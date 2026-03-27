import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {

  en: {
    translation: {
      home: "Home",
      world: "World",
      politics: "Politics",
      search: "Search...",
      login: "Login",
      register: "Register"
    }
  },

  rw: {
    translation: {
      home: "Ahabanza",
      world: "Isi",
      politics: "Politiki",
      search: "Shakisha...",
      login: "Injira",
      register: "Iyandikishe"
    }
  },

  fr: {
    translation: {
      home: "Accueil",
      world: "Monde",
      politics: "Politique",
      search: "Recherche...",
      login: "Connexion",
      register: "Inscription"
    }
  }

};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;