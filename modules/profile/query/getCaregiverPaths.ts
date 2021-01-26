import { getServiceClient, gql } from "@/modules/graphql";
import { routeToSegments } from "@/modules/common/utils";
import { ICaregiver, CaregiverFields } from "../types";
import { ISegmentPath } from "@/modules/editorial/types";

export async function getCaregiverPaths(): Promise<ISegmentPath[] | undefined> {
  const query = gql`
    query getCaregiverPaths {
      caregivers { 
        ${CaregiverFields}
      }
    }
  `;

  const client = await getServiceClient();
  if (!client) return [];

  const caregivers = await client
    .request<{ caregivers: ICaregiver[] }>(query)
    .then(data => data.caregivers)
    .catch(e => {
      console.warn("error", e);
      return null;
    });

  return caregivers?.map(cargiver => ({
    params: { segments: routeToSegments(cargiver.route) },
    locale: "de",
  }));
}
