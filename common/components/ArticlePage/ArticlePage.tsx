// Components
import { Tag } from "carbon-components-react";
// Types
import { IArticle } from "@/modules/articles/types";

interface IArticleProps {
	content: IArticle;
}

export const ArticlePage = ({ content }: IArticleProps) => {
<<<<<<< HEAD
	const { label, body, tags, category } = content;
=======
	const { label, body, category } = content;
>>>>>>> origin/segments-wip
	return (
		<>
			<h1>{label}</h1>
			<div
				dangerouslySetInnerHTML={{
					__html: body,
				}}
<<<<<<< HEAD
			/>
=======
			>
			</div>
>>>>>>> origin/segments-wip
			<Tag>{category.label}</Tag>
		</>
	);
};