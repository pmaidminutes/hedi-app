// Types
import { useLanguageSwitch, ILanguageSwitchProps } from "./useLanguageSwitch";
import { OverflowMenu, OverflowMenuItem, Link } from "carbon-components-react";
import { Language32 } from "@carbon/icons-react";
/**
 * Language Switch Component.
 *
 * @param {array[]} translations - A List of locales and url paths of translations of the current page.
 * @param {string} type - "component" as default and "text" for only showing text link
 */
export const LanguageSwitch = (
  props: ILanguageSwitchProps
): JSX.Element | null => {
  const { translations, type, items } = useLanguageSwitch(props);
  console.log({translations})

  if (type === "component") {
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
            href={item.path}
            itemText={item.lang}
            hasDivider={true}></OverflowMenuItem>
        ))}
      </OverflowMenu>
    );
  } else if (type === "text") {
    return (
      <>
        {translations.map((translation, index) => (
          <Link
            key={translation.label + index}
            href={translation.route}
            title={translation.label}>
            {translation.label}
          </Link>
        ))}
      </>
    );
  } else return null;
};