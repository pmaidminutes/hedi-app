import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { LanguageSkill } from "@/modules/profile/client/components/LanguageSkills";
import { IShell } from "../types";
import { ShellLinkFields } from "../types/shellLinks";
import { LanguagesGQL } from "./getLanguages";

export const getShellLinksGQL = (name: string, keys: string[]) => {
  return `${name}:appPagesByKey(keys:[${keys
    .map(key => `"${key}"`)
    .join(",")}],lang: $lang) {
    ${ShellLinkFields}
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
