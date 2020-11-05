import Head from "next/head";
import { useRouter } from "next/router";

import {
	Content,
	SideNav,
	SideNavLink,
	SelectItem,
	Select,
	ListItem,
} from "carbon-components-react";

export default function Index() {
	const router = useRouter();
	const { locale, locales, defaultLocale } = router;

	const handleValueChange = (e) => {
		console.log("change", e.currentTarget.value);
		router.push("/", "/", { locale: e.currentTarget.value });
	};
	return (
		<div>
			<Head>
				<title>HEDI App index</title>
			</Head>
			<SideNav
				isFixedNav
				expanded={true}
				isChildOfHeader={false}
				aria-label="Side Navigation"
			>
				<ListItem>
					<Select
						id="language-switch"
						defaultValue={locale}
						invalidText="A valid value is required"
						labelText="Select Language"
						onChange={handleValueChange}
					>
						{locales.map((lang, index) => (
							<SelectItem value={lang} text={lang} key={index} />
						))}
					</Select>
				</ListItem>
				<SideNavLink href="de">Deutsch</SideNavLink>
				<SideNavLink href="en">English</SideNavLink>
			</SideNav>
			<Content>
				<h1>HEDI App</h1>
				<p>HEDI App index, up and running</p>
				<p>Current locale: {locale}</p>
				<p>Default locale: {defaultLocale}</p>
				<p>Configured locales: {JSON.stringify(locales)}</p>
			</Content>
		</div>
	);
}
