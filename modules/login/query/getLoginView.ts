import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { getLangByRoute, getUIElementValue } from "@/modules/common/utils";
import { AppPagesGQL } from "@/modules/common/query";
import { IAppPage } from "@/modules/common/types";
import { ILoginView } from "../types";
import { EntityFields } from "@/modules/model";

export async function getLoginView(route: string): Promise<ILoginView | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getLoginView(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      ${AppPagesGQL}
    }
  `;
  const client = await getServiceClient(GQLEndpoint.Internal);
  const loginView = await client
    .request<{ appPages: IAppPage[] }>(query, {
      routes: [route],
      lang,
    })
    .then(data => {
      return data.appPages?.[0];
    })
    .catch(e => {
      console.warn(e);
      return null;
    });
  if (!(loginView && loginView.key === "login")) {
    return null;
  }
  const keys = [
    "registration",
    getUIElementValue("redirect", loginView.elements),
  ];
  const subquery = gql`
    query getLoginViewOtherLinks(
      $keys: [String!]!
      $lang: String!
    ) {
      links: appPagesByKey(keys: $keys, lang: $lang) {
        key
        ${EntityFields}
      }
    }
  `;
  const subResults = await client.request<Pick<ILoginView, "links">>(subquery, {
    lang,
    keys,
  });
  {
    loginView.type = "Login";
    return { ...loginView, ...subResults };
  }
}
