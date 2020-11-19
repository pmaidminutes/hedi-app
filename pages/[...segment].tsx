import Head from "next/head";
// Types
import { GetStaticPaths, GetStaticProps } from "next/types";
import {
	ISegmentProps,
	ISegmentParams,
	ICategory,
	IArticle,
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
	Category,
	Article,
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

	let content;
	if (segment) {
		const slug = stringToSlug(segment[segment.length - 1])
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

// HACK typeguards on Article and Category produce an undefined error
// therefore the 'manual' if on typeName and a typecast of 'content' (and therefore the content is let not const)

export default function Segment(props: ISegmentProps) {
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
			{ ( content?.typeName === 'Category' ) &&   <Category content={content as ICategory} />  }
			{ ( content?.typeName === 'Article' ) &&   <Article content={content as IArticle} />  }
			</Content>
		</div>
	);
}