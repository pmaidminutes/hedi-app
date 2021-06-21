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
    appStyle,
    useBreadCrumb,
    revalidate,
    useHeader,
    redirectUnAuthorized,
    layout,
  } = content;
  const { languages, shellConfig } = shellData;
  // TODO type?
  let shellProps = { shellConfig } as any;

  if (languages)
    setProperty(
      shellProps,
      "langDirections",
      generateLangDirections(languages)
    );
  if (translations)
    setProperty(
      shellProps,
      "languageSwitchLinks",
      generateLanguageSwitchLinks(languages, translations)
    );
  if (useHeader) setProperty(shellProps, "useHeader", useHeader);
  if (redirectUnAuthorized)
    setProperty(shellProps, "redirectUnAuthorized", redirectUnAuthorized);
  if (appStyle) setProperty(shellProps, "appStyle", appStyle);
  if (revalidate) setProperty(shellProps, "revalidate", revalidate);
  if (useBreadCrumb) setProperty(shellProps, "useBreadCrumb", useBreadCrumb);
  if (layout) setProperty(shellProps, "layout", layout);

  return shellProps;
}

function generateLangDirections(languages: ILanguage[]): Partial<ILanguage>[] {
  if (!languages) return [];
  return languages.map((language: ILanguage) => {
    return {
      code: language.code,
      isRTL: language.isRTL,
    };
  });
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
