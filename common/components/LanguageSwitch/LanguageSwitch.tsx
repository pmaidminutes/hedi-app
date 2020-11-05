import { SelectItem, Select } from "carbon-components-react";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

interface LanguageSwitchProps {
	locales: string[] | undefined;
	locale: string | undefined;
}

export const LanguageSwitch = ({ locales, locale }: LanguageSwitchProps) => {
	const router = useRouter();

	const handleValueChange = (event: ChangeEvent<HTMLSelectElement>) => {
		router.push("/", "/", { locale: event.currentTarget.value });
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
