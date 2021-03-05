import { getServiceClient, gql } from "@/modules/graphql";
import { routeToSegments } from "@/modules/common/utils";
import { IEntityLocalized, EntityLocalizedFields } from "@/modules/model";
import { ISegmentPath } from "@/modules/common/types";

export async function getPagePaths(
  lang = "de"
): Promise<ISegmentPath[] | undefined> {
  const query = gql`
    query getPagePaths($lang: String) {
      pages(lang: $lang) { 
        ${EntityLocalizedFields}
      }
    }
  `;

  const client = await getServiceClient();
  if (!client) return [];

  const pages = await client
    .request<{ pages: IEntityLocalized[] }>(query, { lang })
    .then(data => data.pages)
    .catch(e => {
      console.warn("error", e);
      return null;
    });

  return pages
    ?.map(a => ({
      params: { segments: routeToSegments(a.route) },
      locale: a.lang,
    }))
    .filter(a => a.locale === lang);
}
