import { getServiceClient, gql } from "@/modules/graphql";
import { routeToSegments } from "@/modules/common/utils";
import { ISegmentPath } from "@/modules/common/types";
import { EntityLocalizedFields, IEntityLocalized } from "@/modules/model";

export async function getSearchViewPath(lang: string): Promise<ISegmentPath[]> {
  const query = gql`
    query getSearchPath($keys: [String!], $lang: String) {
      uitexts(keys: $keys, lang: $lang) {
        ${EntityLocalizedFields}
      }
    }
  `;

  const client = await getServiceClient();
  const segments = await client
    .request<{ uitexts: IEntityLocalized[] }>(query, { keys: ["search"], lang })
    .then(data => routeToSegments(data.uitexts?.[0].route));
  return [{ params: { segments }, locale: lang }];
}
