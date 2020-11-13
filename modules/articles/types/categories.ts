import { IArticle } from "./articles";

export interface ICategoryBasic {
	name: string;
}

export interface ICategoryPath extends ICategoryBasic{
  path: string;
}

export interface ICategory extends ICategoryBasic {
	id: number;
	path: string;
	parent?: string;
	articles: IArticle[];
	categories: ICategory[];
}
