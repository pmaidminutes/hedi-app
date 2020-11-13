import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// Types
import { GetStaticPaths, GetStaticProps } from "next/types";
import { ISegmentParams, ISegmentProps } from "../../modules/articles/types";
// Modules
import { getAllSegments } from "../../modules/articles/segments";
import { getCategoryBySlug } from "../../modules/articles/categories";
// Helper
import { stringToSlug } from "../../modules/articles/helper";
// Components
import {
	Content,
	SideNav,
	ListItem,
	SideNavLink,
	UnorderedList,
	Tile,
} from "carbon-components-react";
import { LanguageSwitch, CustomSideNavLink } from "../../common/components";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	const poops = [];
	for (let index in locales) {
		poops.concat(await getAllSegments(locales[index]))
	}

	console.log({ poops });
	// let paths = await getAllLocaledSegments(locales);
	// locales?.forEach(async (locale) => {
	// 	console.log(await getAllSegments(locale));
	// });

	// paths.forEach((path) => {
	// 	path.params.segment.forEach((s) => console.log(s));
	// 	console.log('locale: ',path.params.locale);
	// });
	const paths = [
		{ params: { segment: ["schwangerschaft"] }, locale: "de" },
		{ params: { segment: ["pregnancy"] }, locale: "en" },
	];
	// const paths = await getAllLocaledSegments(locales);
	console.log({ paths });
	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
	console.log({ context });
	const { params, locale, locales, defaultLocale } = context;
	console.log({ locale }, { locales });
	const { segment } = params ?? { segment: [] };

	const slug =
		segment !== undefined ? stringToSlug(segment[segment.length - 1]) : null;
	// TODO: check if this could be done in an other way
	const content =
		slug !== null
			? await getCategoryBySlug(slug, locale)
			: { name: "", categorie: [], articles: [] };
	const { name, categories, articles } = content;
	debugger;
	return {
		props: {
			name: name ?? null,
			categories: categories ?? [],
			articles: articles ?? [],
		},
	};
};

export default function Segment(props: ISegmentProps) {
	const { name, categories, articles } = props;
	if (props !== null) {
		return (
			<div>
				<Head>
					<title>HEDI App - {name}</title>
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
					<h1>{name}</h1>
					{categories.length > 0 ? (
						<Tile>
							<h2>Categories</h2>
							<UnorderedList>
								{categories.map((category, index) => (
									<ListItem key={index}>
										<Link href={`/dummy${category.path}`}>{category.name}</Link>
									</ListItem>
								))}
							</UnorderedList>
						</Tile>
					) : null}
					{articles.length > 0 ? (
						<Tile>
							<h2>Articles</h2>
							<UnorderedList>
								{articles.map((article, index) => (
									<ListItem key={index}>
										<Link href={`/dummy${article.path}`}>{article.title}</Link>
									</ListItem>
								))}
							</UnorderedList>
						</Tile>
					) : null}
				</Content>
			</div>
		);
	}
	return null;
}
