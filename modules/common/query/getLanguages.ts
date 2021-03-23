import { getServiceClient, gql } from "@/modules/graphql";
import { ILanguage, LanguageFields } from "@/modules/model";

export async function getAllLanguages(lang = "de") {
  const query = gql`
    query getAllLanguages($lang: String) {
      allLanguages(lang: $lang) {
        ${LanguageFields}
      }
    }
  `;

  const client = await getServiceClient();
  if (!client) return [];

  return client
    .request<{ allLanguages: ILanguage }>(query, { lang })
    .then(data => data.allLanguages ?? [])
    .catch(e => {
      console.warn("error", e);
      return [];
    });
}
