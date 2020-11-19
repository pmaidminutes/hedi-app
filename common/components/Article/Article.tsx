// Components
import { Tag } from "carbon-components-react";
// Types
import { IArticle } from "@/modules/articles/types";

interface IArticleProps {
	content: IArticle;
}

export const Article = ({ content }: IArticleProps) => {
	const { label, body, category } = content;
	return (
		<>
			<h1>{label}</h1>
			<div
				dangerouslySetInnerHTML={{
					__html: body,
				}}
			>
			</div>
			<Tag>{category.label}</Tag>
		</>
	);
};