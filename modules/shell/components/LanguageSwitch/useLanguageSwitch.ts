import { useRouter } from "next/router";
import { IEntityLocalized } from "@/modules/model";
export interface ILanguageSwitchProps {
  translations: IEntityLocalized[];
  type: "text" | "component";
}
export function useLanguageSwitch({
  translations,
  type = "component",
}: ILanguageSwitchProps) {
  const router = useRouter();
  const { locales, asPath: currentPath, locale } = router;

  const items =
    locales?.map(lang => ({
      lang,
      path:
        findLocaledUrlpath(lang, translations) ?? `/${locale}${currentPath}`,
    })) ?? [];

  return { items, translations, type };
}

function findLocaledUrlpath(locale: string, translations: IEntityLocalized[]) {
  return translations.find(translation => translation.lang === locale)?.route;
}
