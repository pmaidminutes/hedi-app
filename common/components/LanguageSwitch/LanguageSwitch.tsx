import { SelectItem, Select } from "carbon-components-react";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

interface LanguageSwitchProps {
	locales: string[] | undefined;
  locale: string | undefined;
  path?: string;
}
/**
 * Language Switch Component.
 * 
 * @param {array[]} locales - All the available language codes.
 * @param {string} locale - The current language.
 * @param {string} path - The path of the current site. If empty, the component will redirect to the start page.
 */
export const LanguageSwitch = ({ locales, locale, path = '/' }: LanguageSwitchProps) => {
	const router = useRouter();

	const handleValueChange = (event: ChangeEvent<HTMLSelectElement>) => {
		router.push(path, path, { locale: event.currentTarget.value });
	};

	return (
		<Select
			id="language-switch"
			defaultValue={locale}
			invalidText="A valid value is required"
			labelText="Select Language"
			onChange={(e: ChangeEvent<HTMLSelectElement>) => handleValueChange(e)}
		>
			{locales !== undefined
				? locales.map((lang, index) => (
						<SelectItem value={lang} text={lang} key={index} />
				  ))
				: null}
		</Select>
	);
};
