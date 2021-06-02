import { gql, serviceGQuery } from "@/modules/graphql";
import { logAndFallback } from "@/modules/common/error";
import { IPage, PageGQL } from "@/modules/page/types";

export async function getProfileDefinition(lang: string): Promise<IPage> {
  const query = gql`
    query getProfileDefinition($lang: String!, $includeSelf: Boolean){
      pagesById(ids:["profile"], lang:$lang){
        ${PageGQL}
      }
    }
  `;

  const { pagesById } = await serviceGQuery<{ pagesById: IPage[] }>(query, {
    lang,
  }).then(data => logAndFallback(data, { pagesById: [] as IPage[] }));

  if (pagesById.length < 1)
    throw new Error("Error while fetching Profile Page data");
  return pagesById[0];
}
