// Types
import { IEntityLocalized } from "@/modules/model";
import {
  SwitcherItem,
  Switcher,
} from "carbon-components-react";
import { useRouter } from "next/router";

/**
 * Language Switch Component.
 *
 * @param {array[]} translations - A List of locales and url paths of translations of the current page.
 */
export const LanguageSwitch = ({
  translations,
}: {
  translations: IEntityLocalized[];
}): JSX.Element => {
  const router = useRouter();
  const { locales, asPath: currentPath, locale, defaultLocale } = router;

  // TODO this method will route to not existing pages (e.g. locale en, path = currentPath)
  const items =
    locales?.map(lang => ({
      lang,
      path: findLocaledUrlpath(lang, translations) ?? currentPath,
    })) ?? [];
  return (
    <>
      <Switcher aria-label="Switcher Container">
        {items.map((item, index) => (
          <SwitcherItem
            key={index}
            isSelected={item.lang === locale}
            aria-label={item.lang}
            href={`${item.lang === defaultLocale ? "" : "/" + item.lang}${
              item.path
            }`}>
            {item.lang}
          </SwitcherItem>
        ))}
      </Switcher>
    </>
  );
};

function findLocaledUrlpath(locale: string, translations: IEntityLocalized[]) {
  return translations.find(translation => translation.lang === locale)?.route;
}
