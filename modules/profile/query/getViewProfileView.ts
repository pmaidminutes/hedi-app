import { gql, serviceGQuery } from "@/modules/graphql";
import { getLangByRoute, getUIElementValue } from "@/modules/common/utils";
import { AppPagesGQL } from "@/modules/common/query";
import { IAppPage } from "@/modules/common/types";
import { logAndFallback, logAndNull } from "@/modules/common/error";
import { IShellLink, ShellLinkFields } from "@/modules/shell/types/shellLinks";
import { IViewProfileView } from "../types";

export async function getViewProfileView(
  route: string
): Promise<IViewProfileView | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getViewProfile(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      ${AppPagesGQL}
    }
  `;
  const appPage = await serviceGQuery<{ appPages: IAppPage[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.appPages?.[0]);

  if (!(appPage && appPage.key === "viewprofile")) return null;

  appPage.type = "ViewProfile";
  const keys = [getUIElementValue("edit_redirect", appPage.elements)];
  const subquery = gql`
    query getViewProfileLinks(
      $lang: String!
      $keys:[String!]!
    ) {
      links: appPagesByKey(keys: $keys, lang: $lang) {
        ${ShellLinkFields}
      }
    }
  `;

  const { links } = await serviceGQuery<{ links: IShellLink[] }>(subquery, {
    lang,
    keys,
  }).then(data => logAndFallback(data, { links: [] as IShellLink[] }));

  return {
    ...appPage,
    links,
  };
}
