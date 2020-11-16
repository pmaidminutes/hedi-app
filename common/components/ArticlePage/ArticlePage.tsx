import React from "react";

export const ArticlePage = ({ title, body }) => {
	return (
		<>
			<h1>{title}</h1>
			<div
				dangerouslySetInnerHTML={{
					// __html: article.attributes.body.value,
					__html: body,
				}}
			/>
		</>
	);
};
