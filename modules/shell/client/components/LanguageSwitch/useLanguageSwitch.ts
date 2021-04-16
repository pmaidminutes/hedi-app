import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export function useLanguageSwitch() {
  const router = useRouter();
  const { locale } = router;

  const [isFlipped, setIsFlipped] = useState(!isRtlLanguage(locale));

  useEffect(() => {
    setIsFlipped(!isRtlLanguage(locale));
  }, [locale]);

  return { isFlipped };
}
// TODO info aus Sprachobject 
// HACK needs improvement in future
const rltLanguages = ["fa"];

function isRtlLanguage(lang: string = "de") {
  return rltLanguages.includes(lang);
}
