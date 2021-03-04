import { getServiceClient, gql } from "@/modules/graphql";
import { routeToSegments } from "@/modules/common/utils";
import { IEntityLocalized, EntityLocalizedFields } from "@/modules/model";
import { ISegmentPath } from "../../types";

export async function getCategoryPaths(
  lang = "de"
): Promise<ISegmentPath[] | undefined> {
  const query = gql`
    query getCategoryPaths($lang: String) {
      categories(lang: $lang) {
        ${EntityLocalizedFields}
      }
    }
  `;

  const client = await getServiceClient();
  if (!client) return [];

  const categories = await client
    .request<{ categories: IEntityLocalized[] }>(query, { lang })
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
