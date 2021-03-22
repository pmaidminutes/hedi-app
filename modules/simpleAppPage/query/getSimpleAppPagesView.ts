import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { getLangByRoute } from "@/modules/common/utils";
import { AppPagesGQL } from "@/modules/common/query";
import { IAppPage } from "@/modules/common/types";
import { simpleAppPageKeys } from "../types/SimpleAppPageKeys";
import { capitalizeFirstLetter } from "../helper/NamingHelpers";

export async function getSimpleAppPagesView(
  route: string
): Promise<IAppPage | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getSimpleAppPagesView(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      ${AppPagesGQL}
    }
  `;
  const client = await getServiceClient(GQLEndpoint.Internal);
  return client
    .request<{ appPages: IAppPage[] }>(query, {
      routes: [route],
      lang,
    })
    .then(data => {
      const view = data.appPages?.[0];
      if (view && simpleAppPageKeys.includes(view.key)) {
        view.type = capitalizeFirstLetter(view.key);
        return view;
      }
      return null;
    })
    .catch(e => {
      console.warn(e);
      return null;
    });
}
