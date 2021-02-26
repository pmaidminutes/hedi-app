import { IUIText, UITextFields } from "@/modules/model";
import { getServiceClient, gql } from "@/modules/graphql";

export async function getProfileField(
  keys: string[],
  lang = "de"
): Promise<IUIText[] | null> {
  const query = gql`
    query getProfileField(
      $keys: [String!]!
      $lang: String!
      $includeSelf: Boolean
      ) {
        uitexts(keys:$keys, lang: $lang) {
          ${UITextFields}
        }
      }
  `;

  const client = await getServiceClient();
  return client
    .request<{ uitexts: IUIText[] }>(query, {
      keys: keys,
      lang,
       
  })
    .then(data => {
      return data.uitexts;
    })
    .catch(e => {
      console.warn(e);
      return null;
    });
}
