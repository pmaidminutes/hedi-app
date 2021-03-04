import { IUIText, UITextFields } from "@/modules/model";
import { getServiceClient, gql } from "@/modules/graphql";

export async function getProfileField(lang = "de"): Promise<any> {
  const query = gql`
    query getProfileField(
      $keys: [String!]!
      $lang: String!
      $includeSelf: Boolean
      ) {
        uitextsByKey(keys:$keys, lang: $lang) {
          ${UITextFields}
        }
      }
  `;

  const client = await getServiceClient();
  return client
    .request<{ uitextsByKey: IUIText[] }>(query, {
      keys: [
        "profile",
        "profile_parent",
        "profile_caregiver",
        "profile_midwife",
      ],
      lang,
    })
    .then(data => {
      const result: {[key: string]: string} = {};
      data.uitextsByKey?.map(group => group.texts).forEach(item => {
        for (const prop in item) {
          if (Object.prototype.hasOwnProperty.call(item, prop)) {
            result[prop] = item[prop];
          }
        }
      });
      return result;
    })
    .catch(e => {
      console.warn(e);
      return null;
    });
}


