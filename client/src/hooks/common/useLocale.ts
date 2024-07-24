import { DefaultLang } from "../../locales";

const useLocale = () => {
  const currentLang: string = localStorage.getItem("lang") || DefaultLang;

  const handleChangeLang = (lang: string) => {
    localStorage.setItem("lang", lang);
  };

  return { currentLang, handleChangeLang };
};

export default useLocale;
