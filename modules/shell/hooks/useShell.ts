import { setProperty } from "@/modules/common/utils";
import { IEntity, IEntityLocalized, ILanguage } from "@/modules/model";
import { IPageConfig, IShell, IShellProps } from "../types";

export function useShell(
  content: IPageConfig,
  shellConfig: IShell
  // languages: ILanguage[],
  // links: Record<string, IEntity[]>
): IShellProps {
  const {
    translations,
    appstyle,
    useBreadCrumb,
    revalidate,
    useHeader,
    redirectUnAuthorized,
  } = content;
  const { languages, shellConfigs, ...links } = shellConfig;

  // TODO type?
  let shell = { shellConfigs: shellConfigs?.[0].elements } as any;
  for (let key of Object.keys(links)) {
    setProperty(shell, key, links[key] as any);
  }
  if (translations)
    setProperty(
      shell,
      "languageSwitchLinks",
      generateLanguageSwitchLinks(languages, translations)
    );
  if (useHeader) setProperty(shell, "useHeader", useHeader);
  if (redirectUnAuthorized)
    setProperty(shell, "redirectUnAuthorized", redirectUnAuthorized);
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
