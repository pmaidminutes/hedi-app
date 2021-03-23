import { useRouter } from "next/router";
import { IEntityLocalized, ILanguage } from "@/modules/model";
import { VerticalDirection } from "carbon-components-react/typings/shared";

export interface ILanguageSwitchProps {
  translations: IEntityLocalized[];
  direction?: VerticalDirection;
  languages: ILanguage[]
}
export function useLanguageSwitch({
  translations,
  direction = "bottom",
  languages
}: ILanguageSwitchProps) {
  const router = useRouter();
  const { locales, asPath: currentPath, locale } = router;

  const items =
    locales?.map(lang => ({
      lang,
      path:
        findLocaledUrlpath(lang, translations) ?? `/${locale}${currentPath}`,
        label: languages.find((language:ILanguage) => language.code === lang)?.label ?? ''
    })) ?? [];

  console.log({items}, {translations})
  return {
    items,
    direction,
  };
}

function findLocaledUrlpath(locale: string, translations: IEntityLocalized[]) {
  return translations.find(translation => translation.lang === locale)?.route;
}
