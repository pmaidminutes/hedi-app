import { logAndFallback, logAndNull } from "@/modules/common/error";
import { AppPageFields, IAppPage } from "@/modules/common/types";
import { gql, serviceGQuery } from "@/modules/graphql";
import { WithUIElementsFields } from "@/modules/model";
import { IShell } from "../types";
import { ShellLinkFields } from "../types/shellLinks";
import { LanguagesGQL } from "./getLanguages";

export const getShellLinksGQL = (name: string, keys: string[]) => {
  return `${name}:appPagesByKey(keys:[${keys
    .map(key => `"${key}"`)
    .join(",")}],lang: $lang) {
    ${ShellLinkFields}
    key
  }`;
};

export async function getShell(
  lang: string = "de",
  // TODO besser typen
  linkKeys: Record<string, string[]>
): Promise<IShell> {
  const gqlQueries = Object.entries(linkKeys).map(([key, value]) =>
    getShellLinksGQL(key, value)
  );
  gqlQueries.push(LanguagesGQL);

  const query = gql`
    query getShell(
        $lang: String!
        $includeSelf: Boolean
    ) {
      shellAppPage:appPagesByKey(keys:["shellConfigs"], lang: $lang){${WithUIElementsFields}}
      ${gqlQueries.join("\n")}
    }
  `;
  return serviceGQuery<
    Omit<IShell, "shellConfig"> & { shellAppPage: IAppPage[] }
  >(query, { lang }).then(data => {
    const result = logAndNull(data);
    if (!result) return { links: [], languages: [], shellConfig: [] };
    const { shellAppPage, ...rest } = result;
    return {
      shellConfig: shellAppPage?.[0].elements ?? [],
      ...rest,
    } as IShell;
  });
  // rest umbauen
}

// const typeAsLink = (array: IEntity[]) => {
//   return array.map(element => {
//     return { type: "Link", route: element.route, label: element.label };
//   });
// };
