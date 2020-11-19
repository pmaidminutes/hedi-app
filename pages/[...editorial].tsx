import Head from "next/head";
// Types
import { GetStaticPaths, GetStaticProps } from "next/types";
import { ICategory, IArticle } from "@/modules/editorial/types";
import {
	getStaticPaths as getEditorialParams,
	getStaticProps as getEditorialProps,
	IEditorialParam,
	IEditorialParams,
	IEditorialProps,
} from "@/modules/editorial/generators/editorial";
// Components
import {
	Content,
	SideNav,
	ListItem,
	SideNavLink,
} from "carbon-components-react";
import {
	LanguageSwitch,
	CustomSideNavLink,
	Category,
	Article,
} from "@/common/components";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	let paths: IEditorialParams[] = await getEditorialParams(locales ?? []);

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
	IEditorialProps,
	IEditorialParam
> = async (context) => {
	const { params, locale, locales } = context;
	const { editorial } = params ?? { editorial: [] };

	if (!(editorial && locale && locales)) throw Error("fatal error...");

	let content;
	content = await getEditorialProps(editorial, locale);
	if (!content) {
		console.log("couldn't render for ", editorial);
		throw Error("Houston, we have got a problem");
	}

	return {
		props: {
			content,
			locale,
			locales,
		},
	};
};

// HACK typeguards on Article and Category produce an undefined error
// therefore the 'manual' if on typeName and a typecast of 'content' (and therefore the content is let not const)

export default function Editorial(props: IEditorialProps) {
	const { locale, locales } = props;
	let { content } = props;
	return (
		<div>
			<Head>
				<title>HEDI App</title>
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
				<SideNavLink href="/chat">Chat</SideNavLink>
				<CustomSideNavLink href="/chat">Chat</CustomSideNavLink>
			</SideNav>
			<Content>
				{content?.typeName === "Category" && (
					<Category content={content as ICategory} />
				)}
				{content?.typeName === "Article" && (
					<Article content={content as IArticle} />
				)}
			</Content>
		</div>
	);
}
