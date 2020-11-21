// Modules
import { getAllEditorialSegments } from "@/modules/editorial/segments";
import { getCategoryBySlug } from "@/modules/editorial/categories";
import { getArticleBySlug } from "@/modules/editorial/article";
// Helper
import { stringToSlug } from "@/modules/editorial/helper";
// Types
import { ParsedUrlQuery } from "querystring";
import { IArticle, ICategory } from "@/modules/editorial/types";

export const getStaticPaths = async (locales: string[]) => {
	const paths: IEditorialParams[] = [];
	if (locales) {
		for (let locale of locales) {
			const editorial_segments = await getAllEditorialSegments(locale);
			paths.push(...editorial_segments);
		}
	}
	return paths;
};

export const getStaticProps = async (editorial: string[], locale = "de") => {
	let content;

	const slug = stringToSlug(editorial[editorial.length - 1]);
	content = await getCategoryBySlug(slug, locale);
	if (!content) content = await getArticleBySlug(slug, locale);
	return content;
};

// TODO param vs params naming
export interface IEditorialParam extends ParsedUrlQuery {
	editorial: string[];
}

export interface IEditorialParams {
	params: IEditorialParam;
	locale: string;
}

export interface IEditorialProps {
	locale: string;
	locales: string[];
	content: ICategory | IArticle;
}
