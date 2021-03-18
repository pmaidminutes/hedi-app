import { AppPagesGQL } from "@/modules/common/query";
import { IAppPage } from "@/modules/common/types";
import { getLangByRoute } from "@/modules/common/utils";
import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";

export async function getViewProfileFields(
  route: string
): Promise<IAppPage | null> {
  const lang = getLangByRoute(route);
  console.log(route, "route here");
  console.log(lang, "lang here");
  const query = gql`
    query getViewProfile(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      ${AppPagesGQL}
    }
  `;
  const client = await getServiceClient(GQLEndpoint.Internal);
  const { appPages } = await client
    .request<{ appPages: IAppPage[] }>(query, {
      routes: [route],
      lang,
    })
    .catch(e => {
      console.warn(e);
      return { appPages: [] };
    });

  if (!(appPages?.[0] && appPages[0].key === "viewprofile")) return null;

  const appPage = appPages[0];
  appPage.type = "ViewProfile";

  return { ...appPage };
}
