import { ICategoryPath, IArticlePath } from "./index";
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

interface ISegmentProps {
	pagetype: "article" | "category";
	locale: string;
	locales: string[];
}

export interface ISegmentCategoryProps extends ISegmentProps {
	name: string;
	categories: ICategoryPath[];
	articles: IArticlePath[];
}

export interface ISegmentArticleProps extends ISegmentProps {
	title: string;
	body: string;
}
