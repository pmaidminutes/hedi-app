import { useRouter } from "next/router";
import { IEntityLocalized } from "@/modules/model";
import { VerticalDirection } from "carbon-components-react/typings/shared";

export interface ILanguageSwitchProps {
  translations: IEntityLocalized[];
  direction?: VerticalDirection;
}
export function useLanguageSwitch({
  translations,
  direction = "bottom",
}: ILanguageSwitchProps) {
  const router = useRouter();
  const { locales, asPath: currentPath, locale } = router;

  const items =
    locales?.map(lang => ({
      lang,
      path:
        findLocaledUrlpath(lang, translations) ?? `/${locale}${currentPath}`,
    })) ?? [];

  return {
    items,
    translations,
    direction,
  };
}

function findLocaledUrlpath(locale: string, translations: IEntityLocalized[]) {
  return translations.find(translation => translation.lang === locale)?.route;
}
