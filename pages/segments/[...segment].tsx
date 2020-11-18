import Head from "next/head";
// Types
import { GetStaticPaths, GetStaticProps } from "next/types";
import {
	ISegmentProps,
	ISegmentParams,
	ICategory,
	isICategory,
	IArticle,
	isIArticle,
} from "@/modules/articles/types";
// Modules
import { getAllSegments } from "@/modules/articles/segments";
import { getCategoryBySlug } from "@/modules/articles/categories";
import { getArticleBySlug } from "@/modules/articles/article";

// Helper
import { stringToSlug } from "@/modules/articles/helper";
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
	CategoryPage,
	ArticlePage,
} from "@/common/components";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	let paths: ISegmentParams[] = [];
	for (let index in locales) {
		let segments = await getAllSegments(locales[parseInt(index)]);
		paths.push(...segments);
	}
	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { params, locale, locales } = context;
	const { segment } = params ?? { segment: [] };

	const slug =
		segment !== undefined ? stringToSlug(segment[segment.length - 1]) : null;
	// TODO: check if this could be done in an other way

	let content = undefined;
	if (slug !== null) {
		content = await getCategoryBySlug(slug, locale);
		if (!content)
			content = await getArticleBySlug(slug, locale);
		if (!content) {
			console.log("couldn't render for ", segment)
			throw Error("Houston, we have got a problem");
		}
	}

	return {
		props: {
			content,
			locale,
			locales,
		},
	};
};

export default function Segment(props: ISegmentProps) {
	const { locale, locales, content } = props;

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
				{ isICategory(content) && <CategoryPage content={content} /> }
				
				{ isIArticle(content) &&  <ArticlePage content={content} />  }
			</Content>
		</div>
	);
}
