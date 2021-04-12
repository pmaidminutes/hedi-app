import { gql, serviceGQuery } from "@/modules/graphql";
import { getLangByRoute } from "@/modules/common/utils";
import { AppPagesGQL } from "@/modules/common/query";
import { IAppPage } from "@/modules/common/types";
import { simplePageKeys } from "../types/simplePageKeys";
import { capitalizeFirstLetter } from "../helper/NamingHelpers";
import { logAndNull } from "@/modules/common/error";

export async function getSimplePageView(
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
  return serviceGQuery<{ appPages: IAppPage[] }>(query, {
    routes: [route],
    lang,
  }).then(data => {
    const view = logAndNull(data)?.appPages?.[0];
    if (view && simplePageKeys.includes(view.key)) {
      view.type = capitalizeFirstLetter(view.key);
      return view;
    }
    return null;
  });
}
