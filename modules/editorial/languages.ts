import { getServiceClient, gql } from "@/common/graphql";

export async function getAllLanguages(lang = "de") {
  const query = gql`
    query getAllLanguages($langcode: String) {
      languages {
        isDefault
        langcode
        weight
        isDefault
        isRTL
        translatedName(langcode: $langcode)
      }
    }
  `;

  const client = await getServiceClient();
  if (!client) return [];

  return client
    .request<ILanguage>(query, { langcode: lang })
    .then(data => data ?? [])
    .catch(e => console.warn("error", e));
}

export interface ILanguage {
  isDefault: boolean;
  langcode: string;
  weight: number;
  isRTL: boolean;
  translatedName: string;
}
