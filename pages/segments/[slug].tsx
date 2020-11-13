import Head from "next/head";
import { useRouter } from "next/router";

import { LanguageSwitch, CustomSideNavLink } from "../../common/components";

import {
	Content,
	SideNav,
	ListItem,
	SideNavLink,
} from "carbon-components-react";

export async function getStaticPaths() {
	return {
		paths: [
      { params: { slug: "muh" }, locale: "de"  },
      { params: { slug: "kuh" }, locale: "de"  },
      { params: { slug: "mow" }, locale: "en"  },
      { params: { slug: "cow" }, locale: "en"  },
		],
		fallback: false,
	};
}

export const getStaticProps = async (context) => {
	return {
		props: {
			slug: context.params?.slug ?? "muh",
			locale: context.locale,
			locales: context.locales,
		},
	};
};

export default function Slug(props) {
	console.log({ props });
	const router = useRouter();
	const { pathname } = router;
	const { slug } = props;
	return (
		<div>
			<Head>
				<title>HEDI App Slug</title>
			</Head>
			<SideNav
				isFixedNav
				expanded={true}
				isChildOfHeader={false}
				aria-label="Side Navigation"
			>
				<ListItem>
					{/* <LanguageSwitch locale={locale} locales={locales} path={pathname} /> */}
				</ListItem>
				<SideNavLink href="/chat">Chat</SideNavLink>
				<CustomSideNavLink href="/chat">Chat</CustomSideNavLink>
			</SideNav>
			<Content>
				<h1>HEDI App - {slug}</h1>
				<p>HEDI App index, up and running</p>
				<p>{pathname}</p>
				{/* <p>Current locale: {locale}</p>
				<p>Default locale: {defaultLocale}</p> */}
				{/* <p>Configured locales: {JSON.stringify(locales)}</p> */}
			</Content>
		</div>
	);
}
