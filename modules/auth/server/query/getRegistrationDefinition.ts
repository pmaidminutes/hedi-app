import { logAndFallback } from "@/modules/common/error";
import { IAppPage } from "@/modules/common/types";
import { getUIElementValue } from "@/modules/common/utils";
import { gql, serviceGQuery } from "@/modules/graphql";
import { EntityFields } from "@/modules/model";
import { WithKeyFields } from "@/modules/model/IWithKey";
import { IRegistrationView } from "@/modules/auth/types";

export async function getRegistrationDefinition(
  appPage: IAppPage
): Promise<Pick<IRegistrationView, "links">> {
  const keys = [
    getUIElementValue("success", appPage.elements),
    getUIElementValue("redirect", appPage.elements),
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
  return serviceGQuery<Pick<IRegistrationView, "links">>(subquery, {
    lang: appPage.lang,
    keys,
  }).then(data =>
    logAndFallback(data, { links: [] } as Pick<IRegistrationView, "links">)
  );
}
