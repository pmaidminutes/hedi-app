import { routeToSegments } from "@/modules/common/utils";
import { ISegmentPath } from "@/modules/common/types";
import { getServiceClient, gql } from "@/modules/graphql";
import { EntityLocalizedFields, IEntityLocalized } from "@/modules/model";

export async function getOrganisationPaths(
  lang = "de"
): Promise<ISegmentPath[] | undefined> {
  const query = gql`
    query getOrganisationPaths($lang: String) {
      organisations(lang: $lang)  { 
        ${EntityLocalizedFields}
      }
    }
  `;

  const client = await getServiceClient();
  if (!client) return [];

  const organisations = await client
    .request<{ organisations: IEntityLocalized[] }>(query, { lang })
    .then(data => data.organisations)
    .catch(e => {
      console.warn("error", e);
      return null;
    });

  return organisations?.map(organisation => ({
    params: { segments: routeToSegments(organisation.route) },
    locale: organisation.lang,
  }));
}
