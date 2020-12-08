import { getServiceClient, gql } from "@/common/graphql";
import {
  CategoryFrag,
  CategoryExpandedFrag,
  ICategory,
  ICategoryExpanded,
} from "@/modules/editorial/types";

export async function getCategoryBySlug(
  pageSlug: string,
  lang = "de",
  excludeSelf = true
) {
  const query = gql`
    query getCategoryBySlug(
      $slug: String!
      $srcLang: String
      $dstLang: String
      $excludeSelf: Boolean
    ) {
      categoryBySlug(slug: $slug, srcLang: $srcLang, dstLang: $dstLang) {
        ...CategoryFrag
      }
    }
    ${CategoryFrag}
  `;

  const client = await getServiceClient();

  return client
    .request<{ categoryBySlug: ICategory }>(query, {
      srcLang: lang,
      dstLang: lang,
      slug: pageSlug,
      excludeSelf,
    })
    .then(data => data.categoryBySlug)
    .catch(e => {
      console.warn(e);
      return null;
    });
}

export async function getRootCategories(
  lang = "de",
  locales: string[] = [],
  excludeSelf = true
): Promise<ICategory | null> {
  const query = gql`
    query getRootCategories($lang: String, $excludeSelf: Boolean) {
      categories(langcode: $lang) {
        ...CategoryFrag
      }
    }
    ${CategoryFrag}
  `;

  const client = await getServiceClient();

  return client
    .request<{ categories: ICategory[] }>(query, {
      lang,
      excludeSelf,
    })
    .then(
      data =>
        ({
          // HACK recreating the type like this is too errorprone, find a better for the root category
          typeName: "Category",
          id: 0,
          label: "root",
          langcode: lang,
          slug: "",
          urlpath: "",
          urlsegments: [],
          // TODO investigate: next router push on site root 'app.com/' doesn't respect set locale but again uses the browser query
          // it seems forcing the default language suddenly results in 'app.com/de'
          translations: (locales
            .filter(l => l !== lang)
            .map(l => ({
              langcode: l,
              urlpath: "/" + l,
              urlsegments: [],
            })) as unknown) as ICategory[],
          parent: 0,
          categories: data.categories,
          articles: [],
        } as ICategory)
    )
    .catch(e => {
      console.warn(e);
      return null;
    });
}

export async function getAllCategories(
  lang: string = "de",
  excludeSelf = true
) {
  const query = gql`
    query getAllCategories($langcode: String, $excludeSelf: Boolean) {
      categories(langcode: $langcode) {
        ...CategoryExpandedFrag
      }
    }
    ${CategoryExpandedFrag}
  `;

  const client = await getServiceClient();

  return client
    .request<{ categories: ICategoryExpanded[] }>(query, {
      langcode: lang,
      excludeSelf,
    })
    .then(data => data.categories ?? []);
}
