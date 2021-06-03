import { logAndNull } from "@/modules/common/error";
import { gql, serviceGQuery } from "@/modules/graphql";
import { IPage, PageGQL } from "@/modules/page/types";
import { IShell } from "../types";
import { LanguagesGQL } from "./getLanguages";

export async function getShell(lang: string = "de"): Promise<IShell> {
  const query = gql`
    query getShell(
        $lang: String!
        $includeSelf: Boolean
    ) {
      shellPage:pagesById(ids:["shellConfigs"], lang: $lang){${PageGQL}}
      ${LanguagesGQL}
    }
  `;
  return serviceGQuery<Omit<IShell, "shellConfig"> & { shellPage: IPage[] }>(
    query,
    { lang }
  ).then(data => {
    const result = logAndNull(data);
    if (!result) return { links: [], languages: [], shellConfig: [] };
    const { shellPage, ...rest } = result;
    return {
      shellConfig: shellPage?.[0].components ?? [],
      ...rest,
    } as IShell;
  });
}
