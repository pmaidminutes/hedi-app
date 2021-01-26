import { getServiceClient, gql } from "@/modules/graphql";
import { routeToSegments } from "@/modules/common/utils";
import { IMidwife, MidwifeFields } from "../types";
import { ISegmentPath } from "@/modules/editorial/types";

export async function getMidwifePaths(): Promise<ISegmentPath[] | undefined> {
  const query = gql`
    query getCaregiverPaths {
      midwives { 
        ${MidwifeFields}
      }
    }
  `;

  const client = await getServiceClient();
  if (!client) return [];

  const midwives = await client
    .request<{ midwives: IMidwife[] }>(query)
    .then(data => data.midwives)
    .catch(e => {
      console.warn("error", e);
      return null;
    });

  return midwives?.map(midwife => ({
    params: { segments: routeToSegments(midwife.route) },
    locale: "de",
  }));
}
