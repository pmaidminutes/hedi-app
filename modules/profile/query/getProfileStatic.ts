import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { getLangByRoute } from "@/modules/common/utils";
import { AppPageFields, IAppPage } from "@/modules/common/types";

export async function getProfileStatic(
  route: string
): Promise<IAppPage | null> {
  const lang = getLangByRoute(route);

  const client = await getServiceClient(GQLEndpoint.Internal);
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
  const { appPage } = await client.request<{
    appPage: IAppPage[];
  }>(query, {
    lang,
  });
  return appPage[0] || null;
}
