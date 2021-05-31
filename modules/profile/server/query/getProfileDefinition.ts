import { gql, serviceGQuery } from "@/modules/graphql";
import { logAndFallback } from "@/modules/common/error";
import { IPage, PageGQL } from "@/modules/page/types";

export async function getProfileDefinition(
  lang: string
): Promise<IPage | null> {
  const query = gql`
    query getProfileElements($lang: String!){
      pages: pagesByKey(keys:["viewprofile"], lang:$lang){
        ${PageGQL}
      }
    }
  `;

  const { pagesByKey } = await serviceGQuery<{ pagesByKey: IPage[] }>(query, {
    lang,
  }).then(data => logAndFallback(data, { pagesByKey: [] as IPage[] }));

  return pagesByKey.length > 0 ? pagesByKey[0] : null;
}
