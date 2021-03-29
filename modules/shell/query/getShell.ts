import { AppPageFields, IAppPage } from "@/modules/common/types";
import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
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

  const client = await getServiceClient(GQLEndpoint.Internal);
  return client
    .request<Omit<IShell, "shellConfig"> & { shellAppPage: IAppPage[] }>(
      query,
      { lang }
    )
    .then(res => {
      const { shellAppPage, ...rest } = res;
      return {
        shellConfig: shellAppPage?.[0].elements ?? [],
        ...rest,
      } as IShell;
    })
    .catch(e => {
      console.warn(e);
      return { links: [], languages: [], shellConfig: [] };
    });
  // rest umbauen
}

// const typeAsLink = (array: IEntity[]) => {
//   return array.map(element => {
//     return { type: "Link", route: element.route, label: element.label };
//   });
// };
