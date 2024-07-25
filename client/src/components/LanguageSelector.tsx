import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useLocale from "../hooks/common/useLocale";
import useToggle from "../hooks/common/useToggle";

import { LanguageOptions } from "../locales";
import { ILanguageOptions } from "../types/interfaces";

const LanguageSelector = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [selectedLang, setSelectedLang] = useState<ILanguageOptions>(
    LanguageOptions[0]
  );
  const [open, handleToggle] = useToggle();
  const { currentLang, handleChangeLang } = useLocale();

  const handleClickLang = (lang: string) => {
    handleChangeLang(lang);
    handleToggle();
  };

  const getSelectedLang = () => {
    const language =
      LanguageOptions.find((item) => item.lang === currentLang) ||
      LanguageOptions[0];
    setSelectedLang(language);
  };

  const handleOnblur = (e: MouseEvent) => {
    if (!open) return;

    if (
      elementRef.current &&
      !elementRef?.current?.contains(e?.target as Node)
    ) {
      handleToggle();
    }
  };

  useEffect(() => {
    getSelectedLang();
  }, [currentLang]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOnblur, true);
    return () => {
      document.removeEventListener("mousedown", handleOnblur, true);
    };
  });

  return (
    <div className="relative glass-bg" ref={elementRef}>
      <LanguageItem
        country={selectedLang?.country}
        icon={selectedLang?.icon}
        lang={selectedLang?.lang}
        callback={handleToggle}
      />
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          animate={{ opacity: 100 }}
          className="absolute -bottom-24 left-0 glass-bg"
        >
          {LanguageOptions.map((option, idx) => (
            <>
              <LanguageItem
                key={option.country}
                callback={() => handleClickLang(option.lang)}
                country={option.country}
                icon={option.icon}
                lang={option.lang}
              />
              {idx < LanguageOptions.length - 1 && <hr />}
            </>
          ))}
        </motion.div>
      )}
    </div>
  );
};

interface ILanguageItem extends ILanguageOptions {
  callback?: () => void;
}
const LanguageItem: React.FC<ILanguageItem> = ({ country, icon, callback }) => {
  return (
    <div
      key={country}
      onClick={callback}
      className="flex items-center gap-2 px-3 py-2 transition-all duration-300 hover:bg-gold rounded-xl cursor-pointer"
    >
      <span className={`fi ${icon}`}></span>
      <p className="font-body font-bold text-white text-xl">{country}</p>
    </div>
  );
};

export default LanguageSelector;
