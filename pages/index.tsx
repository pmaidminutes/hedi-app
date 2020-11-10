import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { LanguageSwitch, CustomSideNavLink } from "../common/components";

import {
	Content,
	SideNav,
	ListItem,
	SideNavLink,
} from "carbon-components-react";

export default function Index() {
	const router = useRouter();
	const { locale, locales, defaultLocale, pathname } = router;

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
				<ListItem>This link wont work with language transition</ListItem>
				<SideNavLink href="/en/chat">Chat</SideNavLink>
				<ListItem>This link will</ListItem>
				<CustomSideNavLink href="/chat">Chat</CustomSideNavLink>
				<Link href="/search" shallow={true}>
					Search
				</Link>
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
