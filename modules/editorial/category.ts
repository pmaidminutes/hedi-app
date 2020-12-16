import { getServiceClient, gql } from "@/common/graphql";
import { ITranslatable, IURLPath, URLPathFrag } from "@/common/model/cms";
import { ISegmentPath } from "@/common/types";
import {
  CategoryFrag,
  CategoryExpandedFrag,
  ICategory,
  ICategoryExpanded,
} from "@/modules/editorial/types";

export async function getCategoryPaths(lang = "de"): Promise<ISegmentPath[]> {
  const query = gql`
    query getCategoryPaths($langcode: String) {
      categories(langcode: $langcode) {
        ...URLPathFrag
        langcode
        categories {
          ...URLPathFrag
          langcode
        }
      }
    }
    ${URLPathFrag}
  `;

  const client = await getServiceClient();
  if (!client) return [];

  const categories = await client
    .request(query, { langcode: lang })
    .then<ICategoryPath[]>(data => data.categories)
    .catch(e => {
      console.warn("error", e);
      return null;
    });

  return categories ? extractPaths(categories, lang) : [];
}

interface ICategoryPath extends IURLPath, ITranslatable {
  categories?: ICategoryPath[];
}

function extractPaths(cats: ICategoryPath[], lang: string) {
  const result: ISegmentPath[] = [];
  for (const cat of cats) {
    if (cat.langcode === lang)
      result.push({ params: { segments: cat.urlsegments }, locale: lang });
    if (cat.categories) result.push(...extractPaths(cat.categories, lang));
  }
  return result;
}

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
      slug: "/" + pageSlug,
      excludeSelf,
    })
    .then(data => filterUntranslatedArticles(data.categoryBySlug))
    .catch(e => {
      console.warn(e);
      return null;
    });
}

function filterUntranslatedArticles(category: ICategory): ICategory {
  category.articles = category.articles.filter(
    a => a.langcode === category.langcode
  );
  return category;
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


// TODO: remove after added new drupal field
export async function getCategoryColorClass(slug: string, locale: string) {
  const categoryData = await getCategoryBySlug(slug, locale);
  const catId = categoryData?.id ?? 0;
  let colorClass: string;
  switch (catId) {
    case 1:
      colorClass = "hedi-category-color--pregnancy";
      break;
    case 6:
      colorClass = "hedi-category-color--birth";
      break;
    case 7:
      colorClass = "hedi-category-color--after-birth";
      break;
    case 14:
      colorClass = "hedi-category-color--finances";
      break;
    case 13:
      colorClass = "hedi-category-color--advice";
      break;
    default:
      colorClass = "hedi-category-color--root";
  }
  return colorClass;
}
