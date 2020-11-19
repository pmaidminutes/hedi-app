import { ParsedUrlQuery } from "querystring";
import { IArticle } from "./article";
import { ICategory } from "./category";
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
	locale: string;
	locales: string[];
	content: ICategory | IArticle
}
