import { gql, serviceGQuery } from "@/modules/graphql";
import { AppPageFields, IAppPage } from "@/modules/common/types";
import { logAndNull } from "@/modules/common/error";

export async function getProfileStatic(lang: string): Promise<IAppPage | null> {
  const query = gql`
    query getProfileStatic(
      $lang: String!
      $includeSelf: Boolean
    ) {
      appPage: appPagesByKey(keys: ["viewprofile"], lang: $lang) {
        ${AppPageFields}
      }
    }
  `;
  return serviceGQuery<{
    appPage: IAppPage[];
  }>(query, {
    lang,
  }).then(data => logAndNull(data)?.appPage?.[0] ?? null);
}
