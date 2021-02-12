// Types
import { IEntityLocalized } from "@/modules/model";
import { OverflowMenu, OverflowMenuItem } from "carbon-components-react";
import { useRouter } from "next/router";
import { Language32 } from "@carbon/icons-react";

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
    <OverflowMenu
      renderIcon={Language32}
      ariaLabel="Language Menu"
      size="xl"
      flipped={true}>
      {items.map((item, index) => (
        <OverflowMenuItem
          key={index}
          aria-label={item.lang}
          href={`${item.lang === defaultLocale ? "" : "/" + item.lang}${
            item.path
          }`}
          itemText={item.lang}
          hasDivider={true}></OverflowMenuItem>
      ))}
    </OverflowMenu>
  );
};

function findLocaledUrlpath(locale: string, translations: IEntityLocalized[]) {
  return translations.find(translation => translation.lang === locale)?.route;
}
