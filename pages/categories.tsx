import Head from "next/head";
import { LanguageSwitch } from "../common/components";
import { getAllCategories } from "@/modules/editorial/categories";
import { ICategory } from "@/modules/editorial/types/category";
import { GetStaticProps } from "next";

import { Content, SideNav, ListItem, Tabs, Tab } from "carbon-components-react";

export const getStaticProps: GetStaticProps<any> = async ({
	locale,
	locales,
}) => {
	const categories = await getAllCategories(locale);

	return { props: { locales, locale, categories } };
};

interface ICategoriesProps {
	locales: string[];
	locale: string;
	categories: ICategory[];
}

export default function Categories({
	categories,
}: ICategoriesProps) {
	return (
		<div>
			<Head>
				<title>HEDI App index</title>
			</Head>
			<SideNav
				aria-label="Side Navigation"
				isFixedNav
				expanded={true}
				isChildOfHeader={false}
			>
				<ListItem>
					<LanguageSwitch />
				</ListItem>
			</SideNav>
			<Content>
				<Tabs>
					{categories.length > 0
						? categories.map((category) => (
								<Tab key={category.id} label={category.label}>
									{category.categories.length > 0 ? (
										<>
											<h2>Subcategories</h2>
											<ul>
												{category.categories.map((subcategory) => (
													<li key={subcategory.id}>{subcategory.label}</li>
												))}
											</ul>
										</>
									) : null}
									{category.articles.length > 0 ? (
										<>
											<h2>Articles</h2>
											<ul>
												{category.articles.map((article) => (
													<li key={article.id}>{article.label}</li>
												))}
											</ul>
										</>
									) : null}
								</Tab>
						  ))
						: null}
				</Tabs>
			</Content>
		</div>
	);
}
