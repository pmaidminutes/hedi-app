import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import {
  EntityFields,
  IEntity,
  ILanguage,
  LanguageFields,
} from "@/modules/model";

export interface IShell {
  links: IEntity[];
  languages: ILanguage[];
}
// getNavLink(keys: string[], lang) {
//   // via apppages
//   return IEntity[];
// }

// getShell
// # TODO: add right keys
// keys: string[],
export async function getShell(lang: string = "de"): Promise<IShell> {
  const query = gql`
    query getShell(
        $lang: String!
        $includeSelf: Boolean
    ) {
      links: appPagesByKey (keys:["viewprofile"],lang: $lang) {
        ${EntityFields}
      }
      languages{
      ${LanguageFields}

      }
    }
  `;

  const client = await getServiceClient(GQLEndpoint.Internal);
  const { links, languages } = await client
    .request<{
      links: IEntity[];
      languages: ILanguage[];
    }>(query, { lang })
    .catch(e => {
      console.warn(e);
      return { links: [], languages: [] };
    });
  if (!links?.[0] || !languages?.[0]) return { links: [], languages: [] };

  return { links: typeAsLink(links), languages };
}

const typeAsLink = (array: IEntity[]) => {
  return array.map(element => {
    return { type: "Link", route: element.route, label: element.label };
  });
};
