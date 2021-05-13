import { gql, serviceGQuery } from "@/modules/graphql";
import { getUIElementValue } from "@/modules/common/utils";
import { IAppPage } from "@/modules/common/types";
import { logAndFallback } from "@/modules/common/error";
import { IShellLink, ShellLinkFields } from "@/modules/shell/types/shellLinks";
import { IViewProfileView } from "../../types";

export async function getViewProfileDefinition(
  appPage: IAppPage
): Promise<Pick<IViewProfileView, "links">> {
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

  return serviceGQuery<{ links: IShellLink[] }>(subquery, {
    lang: appPage.lang,
    keys,
  }).then(data => logAndFallback(data, { links: [] as IShellLink[] }));
}
