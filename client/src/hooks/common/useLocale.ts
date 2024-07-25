import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { DefaultLang, LanguageOptions } from "../../locales";

const availableLang = LanguageOptions.map((item) => item.lang);

const useLocale = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<string>("");
  const currLang = localStorage.getItem("lang");
  // const currentLang: string = localStorage.getItem("lang") || DefaultLang;

  const getCurrentLang = () => {
    // No selected language in localstorage
    if (!currLang) {
      handleChangeLang(DefaultLang);
      setCurrentLang(DefaultLang);
      return;
    }

    // Selected language in localstorage is invalid
    if (!availableLang.includes(currLang)) {
      handleChangeLang(DefaultLang);
      setCurrentLang(DefaultLang);
      return;
    }

    setCurrentLang(currLang);
  };

  const handleChangeLang = (lang: string) => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    getCurrentLang();
  }, [currLang]);

  return { currentLang, handleChangeLang };
};

export default useLocale;
