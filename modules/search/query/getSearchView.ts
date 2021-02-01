import { IUIText, UITextFields } from "@/modules/model";
import { getServiceClient, gql } from "@/modules/graphql";

export async function getSearchView(
  route: string,
  lang = "de"
): Promise<IUIText | null> {
  const query = gql`
    query getSearchView(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      uitexts(routes: $routes, lang: $lang) {
        ${UITextFields}
      }
    }
  `;
  const client = await getServiceClient();
  return client
    .request<{ uitexts: IUIText[] }>(query, {
      routes: [route],
      lang,
    })
    .then(data => {
      const view = data.uitexts?.[0];
      if (view) view.type = "Search";
      return view;
    })
    .catch(e => {
      console.warn(e);
      return null;
    });
}
