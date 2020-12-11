// Types
import { ITranslatable, IURLPath } from "@/common/model/cms";
import { Select, SelectItem } from "carbon-components-react";
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
  translations?: ILanguageSwitchOption[];
}) => {
  const router = useRouter();
  const { locales, asPath: currentPath } = router;

  // TODO this method will route to not existing pages (e.g. locale en, path = currentPath)
  return (
    <Select
      id="language-switch"
      defaultValue={currentPath}
      invalidText="A valid value is required"
      labelText="Select Language"
      size="sm"
      noLabel
      onChange={e =>
        router.push(e.currentTarget.value, e.currentTarget.value, {
          locale: e.currentTarget.selectedOptions.item(0)?.text,
        })
      }>
      {locales
        ?.map(lang => ({ lang, path: findLocaledUrlpath(lang, translations) }))
        .map(({ lang, path }) => (
          <SelectItem
            value={path ?? currentPath}
            text={lang}
            key={path ?? lang}
          />
        ))}
    </Select>
  );
};

function findLocaledUrlpath(
  locale: string,
  translations?: ILanguageSwitchOption[]
) {
  return translations?.find(translation => translation.langcode === locale)
    ?.urlpath;
}
