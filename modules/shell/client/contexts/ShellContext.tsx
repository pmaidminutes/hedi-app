import { ILanguage } from "@/modules/model";
import React, { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
export const ShellContext = createContext<any>({
  languages: [{ code: "de", isRTL: false }],
});

export const ShellProvider = ({
  children,
  languages,
}: {
  children: React.ReactChild;
  languages: Partial<ILanguage>[];
}) => {
  const router = useRouter();
  const { locale } = router;

  const [isRTL, setIsRTL] = useState(checkIfIsRTL(languages, locale));

  useEffect(() => {
    setIsRTL(checkIfIsRTL(languages, locale));
  }, [locale, languages]);

  return (
    <ShellContext.Provider
      value={{
        isRTL,
      }}>
      {children}
    </ShellContext.Provider>
  );
};

function checkIfIsRTL(languages: Partial<ILanguage>[], locale: string = "de") {
  if (languages.length === 0) return false;
  return languages.find(language => language.code === locale)?.isRTL;
}
