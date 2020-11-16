// Components
import { Tag } from "carbon-components-react";
// Types
import { IArticle } from "@/modules/articles/types";

interface IArticleProps {
	content: IArticle;
}

export const ArticlePage = ({ content }: IArticleProps) => {
	const { title, body, tags, category } = content;
	return (
		<>
			<h1>{title}</h1>
			<div
				dangerouslySetInnerHTML={{
					__html: body,
				}}
			/>
			<Tag>{category.name}</Tag>
		</>
	);
};
