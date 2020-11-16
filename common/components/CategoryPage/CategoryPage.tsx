import Link from "next/link";

export const CategoryPage = ({ name, categories, articles }) => {
	return (
		<>
			<h1>{name}</h1>
			{categories.length > 0 ? (
				<>
					<h2>Subcategories</h2>
					<ul>
						{categories.map((category, index) => (
              <li key={index}><Link href={`/dummy${category.path}`}>{category.name}</Link></li>
						))}
					</ul>
				</>
			) : null}
			{articles.length > 0 ? (
				<>
					<h2>Articles</h2>
					<ul>
						{articles.map((article, index) => (
							<li key={index}><Link href={`/dummy${article.path}`}>{article.title}</Link></li>
						))}
					</ul>
				</>
			) : null}
		</>
	);
};
