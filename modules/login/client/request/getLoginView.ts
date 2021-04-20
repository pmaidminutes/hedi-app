import { gql, serviceGQuery } from "@/modules/graphql";
import { getLangByRoute, getUIElementValue } from "@/modules/common/utils";
import { AppPagesGQL } from "@/modules/common/query";
import { IAppPage } from "@/modules/common/types";
import { ILoginView } from "../../types";
import { EntityFields } from "@/modules/model";
import { logAndFallback, logAndNull } from "@/modules/common/error";
import { WithKeyFields } from "@/modules/model/IWithKey";

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
  const loginView = await serviceGQuery<{ appPages: IAppPage[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.appPages?.[0] ?? null);

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
        ${WithKeyFields}
        ${EntityFields}
      }
    }
  `;
  const subResults = await serviceGQuery<Pick<ILoginView, "links">>(subquery, {
    lang,
    keys,
  }).then(data =>
    logAndFallback(data, { links: [] } as Pick<ILoginView, "links">)
  );
  {
    loginView.type = "Login";
    return { ...loginView, ...subResults };
  }
}
