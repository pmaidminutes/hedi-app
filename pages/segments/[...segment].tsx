import Head from "next/head";
// Types
import { GetStaticPaths, GetStaticProps } from "next/types";
import {
	IArticle,
	ICategory,
	ISegmentProps,
	ISegmentParams,
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
	let isCategory,
		isArticle = false;
	let content;
	if (slug !== null) {
		content = await getCategoryBySlug(slug, locale);
		isCategory = content !== null ? true : false;
		if (!isCategory) {
			content = await getArticleBySlug(slug, locale);
			isArticle = content !== null ? true : false;
		} else if (!isCategory && !isArticle) {
			// TODO: handle Exception
			throw Error("Houston, we have got a problem");
		}
	} else {
		// TODO: fallback for undefined slug
		isCategory = true;
		content = { pagetype: "Category", name: "", categories: [], articles: [] };
	}

	console.log({ content });
	// TODO: fix ts problem

	const { pagetype } = content;

	return {
		props: {
			pagetype,
			content,
			locale,
			locales,
		},
	};
};

export default function Segment(props: ISegmentProps) {
	const { pagetype, locale, locales, content } = props;
	console.log({ pagetype });

	if (props !== null) {
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
					{pagetype === "Category" ? (
						<CategoryPage content={content as ICategory} />
					) : null}
					{pagetype === "Article" ? (
						<ArticlePage content={content as IArticle} />
					) : null}
				</Content>
			</div>
		);
	}
	return null;
}
