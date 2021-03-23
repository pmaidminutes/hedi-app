import {
  IAppStyled,
  IEntity,
  IEntityLocalized,
  IEntityTranslated,
  ILanguage,
} from "@/modules/model";

interface IFooter extends Partial<INav> {
  languageSwitch?: string;
}
interface INav {
  links: IEntity[];
}

export interface IShellProps {
  languageSwitchLinks: IEntity[];
  links: IEntity[];
}

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
