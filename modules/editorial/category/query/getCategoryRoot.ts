import { GraphQLClient } from "graphql-request";
import { gql, serviceGQuery } from "@/modules/graphql";
import { CategoryEntryGQL, ICategory } from "../types";
import { logAndFallback } from "@/modules/common/error";
import {
  ArticleEntryGQL,
  ArticleGQL,
  IArticle,
  IArticleEntry,
} from "../../article/types";
import { IComponent } from "@/modules/components";

export type CategoryRoot = {
  categories: ICategory[];
  articles: IArticle[];
  components: IComponent[];
  recommendedArticles: IArticle[];
};

export type CategoryRootProps = {
  categories: ICategory[];
  articles: IArticle[];
  components: IComponent[];
  recommendedArticles: IArticleEntry[];
};

export async function getCategoryRoot(
  lang: string,
  client?: GraphQLClient
): Promise<CategoryRootProps> {
  const query = gql`
    query getCategoryRoot($lang: String!,$includeSelf: Boolean) {
      articles(lang:$lang) {
        ${ArticleEntryGQL}
      }
      categories(lang: $lang) {
        ${CategoryEntryGQL}
        parent
        appStyle
      }
      recommendedArticles:articles(lang:$lang, routes:["/node/356","/node/357","/node/352"]){
        ${ArticleGQL}
      }
    }
  `;
  const {
    categories,
    articles,
    components,
    recommendedArticles,
  } = await serviceGQuery<CategoryRoot>(query, {
    lang,
  }).then(data =>
    logAndFallback(data, {
      categories: [],
      articles: [],
      components: [],
      recommendedArticles: [],
    } as CategoryRoot)
  );

  const transformedArticles = recommendedArticles.map(article => {
    return {
      type: article.type,
      route: article.route,
      label: article.label,
      lang: article.lang,
      routelabel: article.routelabel,
      appStyle: article.appStyle,
      image: article.category.image,
      summary: article.summary || "",
    };
  });

  const rootCategories = filterRootCategories(categories);

  return {
    categories: rootCategories,
    articles: articles,
    components: components,
    recommendedArticles: transformedArticles,
  };
}

const filterRootCategories = (categories: ICategory[]): ICategory[] =>
  categories.filter(category => category.parent === 0);
