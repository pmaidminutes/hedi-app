import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// Types
import { GetStaticPaths, GetStaticProps } from "next/types";
import {
	ISegmentParams,
	ISegmentArticleProps,
	ISegmentCategoryProps,
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
	UnorderedList,
	Tile,
} from "carbon-components-react";
import {
	LanguageSwitch,
	CustomSideNavLink,
	CategoryPage,
	ArticlePage,
} from "@/common/components";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	let paths = [];
	for (let index in locales) {
		let segments = await getAllSegments(locales[index]);
		paths.push(...segments);
	}
	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { params, locale, locales, defaultLocale } = context;
	const { segment } = params ?? { segment: [] };

	const slug =
		segment !== undefined ? stringToSlug(segment[segment.length - 1]) : null;
	// TODO: check if this could be done in an other way
	let isCategory,
		isArticle = false;
	let content;
	console.log({ slug });
	if (slug !== null) {
		content = await getCategoryBySlug(slug, locale);
		console.log({ content });
		isCategory = content !== null ? true : false;
		console.log({ isCategory });
		if (!isCategory) {
			content = await getArticleBySlug(slug, locale);
			isArticle = content !== null ? true : false;
		} else if (!isCategory && !isArticle) {
			throw Error("Houston, we have got a problem");
		}
	} else {
		// TODO: fallback for undefined slug
		isCategory = true;
		content = { name: "", categorie: [], articles: [] };
	}

	console.log({ isArticle }, { isCategory });

	if (isCategory) {
		const { name, categories, articles } = content;
		console.log({ name });
		return {
			props: {
				pagetype: "category",
				name: name ?? null,
				categories: categories ?? [],
				articles: articles ?? [],
				locale,
				locales,
			},
		};
	} else {
		const { title, body } = content;
		console.log({ title });
		return {
			props: {
				pagetype: "article",
				title: title ?? null,
				body: body ?? null,
				locale,
				locales,
			},
		};
	}
};

export default function Segment(
	props: ISegmentCategoryProps | ISegmentArticleProps
) {
	const router = useRouter();
	const { pathname } = router;
	const {
		pagetype,
		locale,
		locales,
		name,
		categories,
		articles,
		title,
		body,
	} = props;
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
					{pagetype === "category" ? (
						<CategoryPage
							name={name}
							articles={articles}
							categories={categories}
						/>
					) : null}
					{pagetype === "article" ? (
						<ArticlePage title={title} body={body} />
					) : null}
				</Content>
			</div>
		);
	}
	return null;
}
