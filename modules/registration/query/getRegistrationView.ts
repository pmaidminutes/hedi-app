import { logAndFallback, logAndNull } from "@/modules/common/error";
import { AppPagesGQL } from "@/modules/common/query";
import { IAppPage } from "@/modules/common/types";
import { getLangByRoute, getUIElementValue } from "@/modules/common/utils";
import { gql, serviceGQuery } from "@/modules/graphql";
import { EntityFields } from "@/modules/model";
import { WithKeyFields } from "@/modules/model/IWithKey";
import { IRegistrationView } from "../types";

export async function getRegistrationView(
  route: string
): Promise<IRegistrationView | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getRegistrationView(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      ${AppPagesGQL}
    }
  `;
  const view = await serviceGQuery<{ appPages: IAppPage[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.appPages?.[0] ?? null);
  if (!(view && view.key === "registration")) {
    return null;
  }
  const keys = [
    getUIElementValue("success", view.elements),
    getUIElementValue("redirect", view.elements),
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
  const subResults = await serviceGQuery<Pick<IRegistrationView, "links">>(
    subquery,
    {
      lang,
      keys,
    }
  ).then(data =>
    logAndFallback(data, { links: [] } as Pick<IRegistrationView, "links">)
  );
  view.type = "Registration";
  return { ...view, ...subResults };
}
