import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { EntityFields, IEntity, ILanguage } from "@/modules/model";
import { IShell } from "../types";

export const getShellLinksGQL = (name: string, keys: string[]) => {
  return `${name}:appPagesByKey(keys:[${keys
    .map(key => `"${key}"`)
    .join(",")}],lang: $lang) {
    ${EntityFields}
    key
  }`;
};

export async function getShell(
  lang: string = "de",
  gqlQueries: string[]
): Promise<IShell> {
  const query = gql`
    query getShell(
        $lang: String!
        $includeSelf: Boolean
    ) {
      ${gqlQueries.join("\n")}
    }
  `;

  const client = await getServiceClient(GQLEndpoint.Internal);
  return client
    .request<IShell>(query, { lang })
    .catch(e => {
      console.warn(e);
      return { links: [], languages: [] };
    });
  // rest umbauen
}

// const typeAsLink = (array: IEntity[]) => {
//   return array.map(element => {
//     return { type: "Link", route: element.route, label: element.label };
//   });
// };
