import { GraphQLClient } from "graphql-request";
import { gql, serviceGQuery } from "@/modules/graphql";
import { CategoryEntryGQL, ICategory } from "../types";
import { logAndFallback } from "@/modules/common/error";

type CategoryRootResponse = {
  categories: ICategory[];
};

export async function getCategoryRoot(
  lang: string,
  client?: GraphQLClient
): Promise<ICategory[]> {
  const query = gql`
    query getCategoryRoot($lang: String!) {
      categories(lang: $lang) {
${CategoryEntryGQL}
parent
    }}
  `;
  const { categories } = await serviceGQuery<CategoryRootResponse>(query, {
    lang,
  }).then(data =>
    logAndFallback(data, { categories: [] } as CategoryRootResponse)
  );

  return filterRootCategories(categories);
}

const filterRootCategories = (categories: ICategory[]): ICategory[] =>
  categories.filter(category => category.parent === 0);
