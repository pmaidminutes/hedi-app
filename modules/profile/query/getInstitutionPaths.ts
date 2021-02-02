import { routeToSegments } from "@/modules/common/utils";
import { ISegmentPath } from "@/modules/editorial/types";
import { getServiceClient, gql } from "@/modules/graphql";
import { EntityLocalizedFields, IEntityLocalized } from "@/modules/model";

export async function getInstitutionPaths(
  lang = "de"
): Promise<ISegmentPath[] | undefined> {
  const query = gql`
    query getInstitutionPaths($lang: String) {
      institutions(lang: $lang)  { 
        ${EntityLocalizedFields}
      }
    }
  `;

  const client = await getServiceClient();
  if (!client) return [];

  const institutions = await client
    .request<{ institutions: IEntityLocalized[] }>(query, { lang })
    .then(data => data.institutions)
    .catch(e => {
      console.warn("error", e);
      return null;
    });

  return institutions?.map(institution => ({
    params: { segments: routeToSegments(institution.route) },
    locale: institution.lang,
  }));
}
