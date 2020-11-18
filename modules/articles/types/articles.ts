import { ICategory, ICategoryBasic } from "./categories";

interface IArticleBasic {
	label: string;
}

export interface IArticlePath extends IArticleBasic {
	path: string;
	slug: string;
}
export interface IArticle extends IArticlePath {
	pagetype: string;
	id: number;
	category: ICategoryBasic;
	tags: ITag;
	parent: number;
	body: string;
	summary: string;
}

interface ITag {
	id: number;
	name: string;
}

export interface IArticleBySlug {
	articleBySlug: {
		pagetype: string;
		id: number;
		label: string;
		body: string;
		summary: string;
		tags: ITag[];
		category: ICategory;
	};
}
