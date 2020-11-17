import { IArticle, IArticlePath } from "./articles";

export interface ICategoryBasic {
	name: string;
}

export interface ICategoryPath extends ICategoryBasic {
	path: string;
}

export interface ICategory extends ICategoryBasic {
	pagetype: string;
	id: number;
	path: string;
	parent?: string;
	articles: IArticle[];
	categories: ICategory[];
}

export interface ICategoriesBySlug {
	categoryBySlug: {
		pagetype: string;
		name: string;
		categories: ICategoryPath[];
		articles: IArticlePath[];
	};
}
