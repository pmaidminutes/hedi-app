import { getServiceClient, gql } from "@/common/graphql";
import { ILocalizedEntity, LocalizedEntityFields } from "@/common/model/cms";
import { routeToSegments } from "@/common/types";
import {
  ICategory,
  CategoryFields,
  ICategoryRoot,
  CategoryRootFields,
} from "@/modules/editorial/types";

export async function getCategoryPaths(lang = "de") {
  const query = gql`
    query getCategoryPaths($lang: String) {
      categories(lang: $lang) {
        ${LocalizedEntityFields}
      }
    }
  `;

  const client = await getServiceClient();
  if (!client) return [];

  const categories = await client
    .request<{ categories: ILocalizedEntity[] }>(query, { lang })
    .then(data => data.categories)
    .catch(e => {
      console.warn("error", e);
      return null;
    });

  return categories
    ?.map(c => ({
      params: { segments: routeToSegments(c.route) },
      locale: c.lang,
    }))
    .filter(a => a.locale === lang);
}

export async function getCategory(route: string, lang = "de") {
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

export async function getCategoryRoot(
  lang = "de"
): Promise<ICategoryRoot | null> {
  const query = gql`
    query getCategoryRoot($lang: String, $includeSelf: Boolean) {
      categoryroot(lang: $lang) {
        ${CategoryRootFields}
      }
    }
  `;

  const client = await getServiceClient();
  return client
    .request<{ categoryroot: ICategoryRoot | null }>(query, { lang })
    .then(data => hackRootTranslationRoutes(data.categoryroot))
    .catch(e => {
      console.warn(e);
      return null;
    });
}

function hackRootTranslationRoutes(root: ICategoryRoot | null) {
  if (!root) return root;
  root.translations = root.translations.map(t => ({ ...t, route: "/" }));
  return root;
}

// TODO: remove after added new drupal field
export async function getCategoryColorClass(segment: string, lang: string) {
  let key = segment;
  if (lang !== "en") {
    const categoryData = await getCategory("/" + segment, lang);
    const route =
      categoryData?.translations.find(c => c.lang === "en")?.route ?? "/root";
    key = route.substr(1);
  }
  return "hedi-category-color--" + key;
}
