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

export const getShellLinksGQL = (name: string, keys: string[]) => {
  return `${name}:appPagesByKey(keys:[${keys
    .map(key => `"${key}"`)
    .join(",")}],lang: $lang) {
    ${EntityFields}
  }`;
};

export async function getShell(lang: string = "de", gqlQueries: string[]): Promise<IShell> {
  const query = gql`
    query getShell(
        $lang: String!
        $includeSelf: Boolean
    ) {
      ${gqlQueries.join("\n")}
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
