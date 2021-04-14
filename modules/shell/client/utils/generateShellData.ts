import { setProperty } from "@/modules/common/utils";
import { IEntityLocalized, ILanguage } from "@/modules/model";
import { IPageConfig, IShell, IShellProps } from "../../types";

export function generateShellData(
  content: IPageConfig,
  shellData: IShell
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
    pageLayout,
    layoutImg
  } = content;
  const { languages, shellConfig, ...links } = shellData;

  // TODO type?
  let shellProps = { shellConfig } as any;
  for (let key of Object.keys(links)) {
    setProperty(shellProps, key, links[key] as any);
  }
  if (translations)
    setProperty(
      shellProps,
      "languageSwitchLinks",
      generateLanguageSwitchLinks(languages, translations)
    );
  if (useHeader) setProperty(shellProps, "useHeader", useHeader);
  if (redirectUnAuthorized)
    setProperty(shellProps, "redirectUnAuthorized", redirectUnAuthorized);
  if (appstyle) setProperty(shellProps, "appstyle", appstyle);
  if (revalidate) setProperty(shellProps, "revalidate", revalidate);
  if (useBreadCrumb) setProperty(shellProps, "useBreadCrumb", useBreadCrumb);
  if (pageLayout) setProperty(shellProps, "pageLayout", pageLayout);
  if (layoutImg) setProperty(shellProps, "layoutImg", layoutImg);

  return shellProps;
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
