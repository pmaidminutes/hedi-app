import { GraphQLClient } from "graphql-request";
import { gql, serviceGQuery } from "@/modules/graphql";
import { CategoryEntryGQL, ICategory } from "../types";
import { logAndFallback } from "@/modules/common/error";
import { ArticleEntryGQL, IArticle } from "../../article/types";

export type CategoryRoot = {
  categories: ICategory[];
  articles: IArticle[];
};

export async function getCategoryRoot(
  lang: string,
  client?: GraphQLClient
): Promise<CategoryRoot> {
  const query = gql`
    query getCategoryRoot($lang: String!) {
      articles(lang:$lang) {
        ${ArticleEntryGQL}
      }
      categories(lang: $lang) {
        ${CategoryEntryGQL}
        parent
      }
    }
  `;
  const { categories, articles } = await serviceGQuery<CategoryRoot>(
    query,
    {
      lang,
    }
  ).then(data =>
    logAndFallback(data, {
      categories: [],
      articles: [],
    } as CategoryRoot)
  );

  const rootCategories = filterRootCategories(categories);



  return { categories: rootCategories, articles: articles };
}

const filterRootCategories = (categories: ICategory[]): ICategory[] =>
  categories.filter(category => category.parent === 0);
