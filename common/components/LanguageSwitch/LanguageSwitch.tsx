// Types
import { ITranslatable, IURLPath } from "@/common/model/cms";
import { Dropdown } from "carbon-components-react";
import { useRouter } from "next/router";

export interface ILanguageSwitchOption extends ITranslatable, IURLPath {}

/**
 * Language Switch Component.
 *
 * @param {array[]} translations - A List of locales and url paths of translations of the current page.
 */
export const LanguageSwitch = ({
  translations,
}: {
  translations: ILanguageSwitchOption[];
}) => {
  const router = useRouter();
  const { locales, asPath: currentPath, locale } = router;

  // TODO this method will route to not existing pages (e.g. locale en, path = currentPath)
  const items =
    locales?.map(lang => ({
      lang,
      path: findLocaledUrlpath(lang, translations) ?? currentPath,
    })) ?? [];
  return (
    <Dropdown
      id="language-switch"
      label={locale ?? ""}
      invalidText="A valid value is required"
      light
      size="sm"
      //@ts-ignore
      items={items}
      //@ts-ignore
      itemToString={item => item.lang}
      //@ts-ignore
      initialSelectedItem={items.find(i => i.lang === locale)}
      style={{ minWidth: "180px", maxWidth: "180px", alignSelf: "flex-end" }}
      onChange={e =>
        //@ts-ignore
        router.push(e.selectedItem.path, e.selectedItem.value, {
          //@ts-ignore
          locale: e.selectedItem.lang,
        })
      }
    />
  );
};

function findLocaledUrlpath(
  locale: string,
  translations: ILanguageSwitchOption[]
) {
  return translations.find(translation => translation.langcode === locale)
    ?.urlpath;
}
