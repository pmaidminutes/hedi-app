import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { EntityLocalizedFields } from "@/modules/model";
import { AppPageFields, IAppPage } from "../types/appPage";

export const generateAppPagePathsGQL = (keys: string[]): string =>
  `${keys.join("_")}: appPagesByKey(keys: ${JSON.stringify(
    keys
  )}, lang: $lang) { ${EntityLocalizedFields} }`;

export const AppPagesGQL = gql`appPages(routes: $routes, lang: $lang) { ${AppPageFields} }`;

export async function getAppPages(
  keys: string[],
  lang?: string
): Promise<IAppPage[]> {
  const query = gql`
    query getAppPages (
      $keys: [String!]!
      $lang: String!
      ) {
        ${AppPageFields}
      }
  `;

  const client = await getServiceClient(GQLEndpoint.Internal);
  if (!client) return [];

  return client
    .request<IAppPage[]>(query, { keys, lang })
    .catch(error => {
      console.error("error", error);
      return [];
    });
}

export async function getAppPage(
  key: string,
  lang?: string
): Promise<IAppPage> {
  return getAppPages([key], lang).then(pages => pages[0] || null);
}
