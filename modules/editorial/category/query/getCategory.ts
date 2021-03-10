import { getServiceClient, gql } from "@/modules/graphql";
import { ICategory, CategoryFields } from "../types";
import { getLangByRoute } from "@/modules/common/utils";

export async function getCategory(route: string): Promise<ICategory | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getCategories(
      $routes: [String!]!
      $lang: String
      $includeSelf: Boolean
    ) {
      categories(routes: $routes, lang: $lang) {
        ${CategoryFields}
      }
    }
  `;

  const client = await getServiceClient();

  return (
    client
      .request<{ categories: ICategory[] }>(query, { routes: [route], lang })
      // .then(data => data.categoryBySlug)
      .then(data => filterUntranslatedArticles(data.categories[0]))
      .catch(e => {
        console.warn(e);
        return null;
      })
  );
}

function filterUntranslatedArticles(
  category: ICategory | null
): ICategory | null {
  if (
    !category ||
    category.articles === null ||
    category.articles?.length === 0
  )
    return category;
  category.articles = category.articles.filter(a => a.lang === category.lang);
  return category;
}
