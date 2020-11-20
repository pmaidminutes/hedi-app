import { SelectItem, Select } from "carbon-components-react";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
// Types 
import { ICategory, IArticle } from '@/modules/editorial/types'

type LanguageSwitchContent = IArticle | ICategory

interface LanguageSwitchProps {
	translations?: LanguageSwitchContent[]
}

/**
 * Language Switch Component.
 *
 * @param {array[]} translations - All translations of the current page.
 */
export const LanguageSwitch = ({ translations }:LanguageSwitchProps) => {
	const router = useRouter();
	const { pathname, locale, locales } = router;;

	const chooseLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
		const newLang = event.currentTarget.value;
		let path;
		if (translations) {
			const { urlpath } = findLocaledUrlpath(translations, newLang);
			path = urlpath;
		} else {
			path = pathname;
		}
		router.push(path, path, { locale: newLang });
	};

	return (
		<Select
			id="language-switch"
			defaultValue={locale}
			invalidText="A valid value is required"
			labelText="Select Language"
			onChange={(e: ChangeEvent<HTMLSelectElement>) => chooseLanguage(e)}
		>
			{locales !== undefined
				? locales.map((lang, index) => (
						<SelectItem value={lang} text={lang} key={index} />
				  ))
				: null}
		</Select>
	);
};


function findLocaledUrlpath(translations:LanguageSwitchContent[], locale: string) {
	return (
		translations.find((translation) => translation.langcode === locale) ?? {
			urlpath: "/",
		}
	);
}