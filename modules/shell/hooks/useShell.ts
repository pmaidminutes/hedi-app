import {
  IAppStyled,
  IEntity,
  IEntityLocalized,
  IEntityTranslated,
  ILanguage,
} from "@/modules/model";
import { IShellProps } from "../types";

export function useShell(
  languages: ILanguage[],
  content: IEntityTranslated<IEntityLocalized> & Partial<IAppStyled>,
  links: IEntity[]
): IShellProps {
  const { translations } = content;

  const languageSwitchLinks = generateLanguageSwitchLinks(
    translations,
    languages
  );

  return {
    languageSwitchLinks,
    links,
  };
}

function generateLanguageSwitchLinks(
  translations: IEntityLocalized[],
  languages: ILanguage[]
) {
  return translations.map((translation: IEntityLocalized) => {
    return {
      route: translation.route,
      label:
        languages.find(
          (language: ILanguage) => language.code === translation.lang
        )?.label ?? "",
      type: "Link",
    };
  });
}
