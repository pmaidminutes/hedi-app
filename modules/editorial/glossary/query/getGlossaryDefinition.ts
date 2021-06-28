import { gql, serviceGQuery } from "@/modules/graphql";
import { logAndFallback } from "@/modules/common/error";
import { IPage, PageGQL } from "@/modules/page/types";

export async function getGlossaryDefinition(lang: string): Promise<IPage> {
  const query = gql`
    query getGlossaryDefinition($lang: String!, $includeSelf: Boolean){
      pagesById(ids:["glossary"], lang:$lang){
        ${PageGQL}
      }
    }
  `;

  const { pagesById } = await serviceGQuery<{ pagesById: IPage[] }>(query, {
    lang,
  }).then(data => logAndFallback(data, { pagesById: [] as IPage[] }));

  if (pagesById.length < 1)
    throw new Error("Error while fetching glossary definition data");
  return pagesById[0];
}
