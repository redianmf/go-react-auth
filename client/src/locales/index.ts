import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { ILanguageOptions } from "../types/interfaces";

import { en, id, zod_en, zod_id } from "./lang";

const resources = {
  en: {
    translation: en,
    zod: zod_en,
  },
  id: {
    translation: id,
    zod: zod_id,
  },
};

export const DefaultLang: string = "en";
export const LanguageOptions: ILanguageOptions[] = [
  { country: "English", lang: "en", icon: "fi-gb" },
  { country: "Indonesian", lang: "id", icon: "fi-id" },
];

i18next.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || DefaultLang,
  //   fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  debug: false,
});

i18next.loadNamespaces("zod");
