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
  } = content;
  const { languages, ...links } = shellConfig;

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
  setProperty(shell, "useHeader", useHeader !== undefined ? useHeader : true);
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
