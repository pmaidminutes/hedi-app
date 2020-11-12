import Head from "next/head";
import { useRouter } from "next/router";
import { LanguageSwitch } from "../common/components";
import { getAllSegments, ICategory } from "../modules/articles/categories";
import { GetStaticProps } from "next";

import { Content, SideNav, ListItem, Tabs, Tab } from "carbon-components-react";

export const getStaticProps: GetStaticProps<any> = async ({
	locale,
	locales,
}) => {
	const categories = await getAllSegments(locale);

	return { props: { locales, locale, categories } };
};

interface ICategoriesProps {
	locales: string[];
	locale: string;
	categories: ICategory[];
}

export default function Categories({
	locales,
	locale,
	categories,
}: ICategoriesProps) {
	const router = useRouter();
	const { pathname } = router;
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
					<LanguageSwitch locale={locale} locales={locales} path={pathname} />
				</ListItem>
			</SideNav>
			<Content>
				<Tabs>
					{categories.length > 0
						? categories.map((category) => (
								<Tab key={category.id} label={category.name}>
									{category.categories.length > 0 ? (
										<>
											<h2>Subcategories</h2>
											<ul>
												{category.categories.map((subcategory) => (
													<li key={subcategory.id}>{subcategory.name}</li>
												))}
											</ul>
										</>
									) : null}
									{category.articles.length > 0 ? (
										<>
											<h2>Articles</h2>
											<ul>
												{category.articles.map((article) => (
													<li key={article.id}>{article.title}</li>
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
