import { gql, serviceGQuery } from "@/modules/graphql";
import { getLangByRoute } from "@/modules/common/utils";
import { AppPagesGQL } from "@/modules/common/query";
import { IAppPage } from "@/modules/common/types";
import { capitalizeFirstLetter } from "../helper/NamingHelpers";
import { logAndNull } from "@/modules/common/error";

export async function getAppPageView(
  route: string
): Promise<IAppPage | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getAppPagesView(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      ${AppPagesGQL}
    }
  `;
  return serviceGQuery<{ appPages: IAppPage[] }>(query, {
    routes: [route],
    lang,
  }).then(data => {
    const view = logAndNull(data)?.appPages?.[0];

    if (view) {
      return view;
    }
    return null;
  });
}
