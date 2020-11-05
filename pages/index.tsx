import Head from "next/head";
import { useRouter } from "next/router";

import { LanguageSwitch } from "../common/components";

import {
	Content,
	SideNav,
	SelectItem,
	Select,
	ListItem,
} from "carbon-components-react";
import { ChangeEvent } from "react";

export default function Index() {
	const router = useRouter();
	const { locale, locales, defaultLocale, pathname } = router;

	const handleValueChange = (event: ChangeEvent<HTMLSelectElement>) => {
		router.push("/", "/", { locale: event.currentTarget.value });
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
          <LanguageSwitch locale={locale} locales={locales} />
				</ListItem>
			</SideNav>
			<Content>
				<h1>HEDI App</h1>
				<p>HEDI App index, up and running</p>
				<p>{pathname}</p>
				<p>Current locale: {locale}</p>
				<p>Default locale: {defaultLocale}</p>
				<p>Configured locales: {JSON.stringify(locales)}</p>
			</Content>
		</div>
	);
}
