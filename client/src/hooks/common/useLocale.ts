import { useTranslation } from "react-i18next";
import { DefaultLang } from "../../locales";

const useLocale = () => {
  const { i18n } = useTranslation();
  const currentLang: string = localStorage.getItem("lang") || DefaultLang;

  const handleChangeLang = (lang: string) => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  };

  return { currentLang, handleChangeLang };
};

export default useLocale;
