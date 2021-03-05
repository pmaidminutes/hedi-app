import { getServiceClient, gql } from "@/modules/graphql";
import { routeToSegments } from "@/modules/common/utils";
import { IEntityLocalized, EntityLocalizedFields } from "@/modules/model";
import { ISegmentPath } from "@/modules/common/types";

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
