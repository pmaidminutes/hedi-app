import { ParsedUrlQuery } from "querystring";
import { IArticle } from "./articles";
import { ICategory } from "./categories";
export interface ISegmentParams {
	params: {
		segment: string[];
	};
	locale: string;
}
export interface ISegment {
	articles: IPath[];
	categories: ICategorySegment[];
}


export interface ICategorySegment extends IPath {
	categories: IPath[];
}

export interface IPath {
	path: string;
}

export interface ISegmentProps {
	pagetype: "article" | "category";
	locale: string;
	locales: string[];
	content: ICategory | IArticle
}
