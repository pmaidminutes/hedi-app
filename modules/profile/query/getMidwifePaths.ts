import { getServiceClient, gql } from "@/modules/graphql";
import { routeToSegments } from "@/modules/common/utils";
import { ISegmentPath } from "@/modules/common/types";
import { IEntityLocalized, EntityLocalizedFields } from "@/modules/model";

export async function getMidwifePaths(
  lang = "de"
): Promise<ISegmentPath[] | undefined> {
  const query = gql`
    query getCaregiverPaths($lang: String) {
      midwives(lang: $lang) { 
        ${EntityLocalizedFields}
      }
    }
  `;

  const client = await getServiceClient();
  if (!client) return [];

  const midwives = await client
    .request<{ midwives: IEntityLocalized[] }>(query, { lang })
    .then(data => data.midwives)
    .catch(e => {
      console.warn("error", e);
      return null;
    });

  return midwives?.map(midwife => ({
    params: { segments: routeToSegments(midwife.route) },
    locale: midwife.lang,
  }));
}
