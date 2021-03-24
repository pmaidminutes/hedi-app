import { setProperty } from "@/modules/common/utils";
import { IEntity, IEntityLocalized, ILanguage } from "@/modules/model";
import { IPageConfig, IShellProps } from "../types";

export function useShell(
  languages: ILanguage[],
  content: IPageConfig,
  links: Record<string, IEntity[]>
): IShellProps {
  const { translations, appstyle, useBreadCrumb, revalidate } = content;

  // TODO type?
  let shell = {} as any;
  for (let key of Object.keys(links)) {
    setProperty(shell, key, links[key] as any);
  }
  if (translations)
    setProperty(
      shell,
      "languageSwitchLinks",
      generateLanguageSwitchLinks(languages, translations)
    );
  if (appstyle) setProperty(shell, "appstyle", appstyle);
  if (revalidate) setProperty(shell, "revalidate", revalidate);
  if (useBreadCrumb) setProperty(shell, "useBreadCrumb", useBreadCrumb);


  return shell;
}

function generateLanguageSwitchLinks(
  languages: ILanguage[],
  translations?: IEntityLocalized[]
) {
  if (!translations) return [];
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