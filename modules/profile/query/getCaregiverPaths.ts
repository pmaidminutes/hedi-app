import { getServiceClient, gql } from "@/modules/graphql";
import { routeToSegments } from "@/modules/common/utils";
import { ISegmentPath } from "@/modules/common/types";
import { IEntityLocalized, EntityLocalizedFields } from "@/modules/model";

export async function getCaregiverPaths(
  lang = "de"
): Promise<ISegmentPath[] | undefined> {
  const query = gql`
    query getCaregiverPaths($lang: String) {
      caregivers(lang: $lang)  { 
        ${EntityLocalizedFields}
      }
    }
  `;

  const client = await getServiceClient();
  if (!client) return [];

  const caregivers = await client
    .request<{ caregivers: IEntityLocalized[] }>(query, { lang })
    .then(data => data.caregivers)
    .catch(e => {
      console.warn("error", e);
      return null;
    });

  return caregivers?.map(caregiver => ({
    params: { segments: routeToSegments(caregiver.route) },
    locale: caregiver.lang,
  }));
}
