import { ICategoryBasic } from "./categories";

interface IArticleBasic{
  title: string;
}

export interface IArticlePath extends IArticleBasic{
  path: string;
}
export interface IArticle extends IArticlePath{
	id: number;
	category: ICategoryBasic;
	tags: ITag;
	parent: number;
}

interface ITag {
	id: number;
	name: string;
}
