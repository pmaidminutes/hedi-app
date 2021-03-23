// Types
import { useLanguageSwitch, ILanguageSwitchProps } from "./useLanguageSwitch";
import { OverflowMenu, OverflowMenuItem } from "carbon-components-react";
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
  const { direction, links } = useLanguageSwitch(props);

  return (
    <OverflowMenu
      renderIcon={Language32}
      ariaLabel="Language Menu"
      size="xl"
      direction={direction}
      flipped={true}>
      {links.map((item, index) => (
        <OverflowMenuItem
          key={index}
          aria-label={item.label}
          href={item.route}
          itemText={item.label}
          hasDivider={true}
        />
      ))}
    </OverflowMenu>
  );
};
