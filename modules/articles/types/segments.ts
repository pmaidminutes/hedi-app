import { ICategoryPath, IArticlePath } from "./index";
export interface ISegmentParams {
	params: {
		segment: string[];
		locale: string;
	};
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
	name: string;
	categories: ICategoryPath[];
	articles: IArticlePath[];
}
