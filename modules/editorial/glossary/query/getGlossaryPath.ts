import { getServiceClient, gql } from "@/modules/graphql";
import { IEntityLocalized, EntityLocalizedFields } from "@/common/model/cms";
import { ISegmentPath, routeToSegments } from "@/common/types";

export async function getGlossaryPath(lang: string): Promise<ISegmentPath[]> {
  const query = gql`
    query getGlossary($lang: String) {
      glossary(lang: $lang) {
        ${EntityLocalizedFields}
      }
    }
  `;

  const client = await getServiceClient();
  const segments = await client
    .request<{ glossary?: IEntityLocalized }>(query, { lang })
    .then(data => routeToSegments(data.glossary?.route));

  return [{ params: { segments }, locale: lang }];
}
