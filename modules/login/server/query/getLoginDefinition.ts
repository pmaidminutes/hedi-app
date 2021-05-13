import { gql, serviceGQuery } from "@/modules/graphql";
import { getUIElementValue } from "@/modules/common/utils";
import { IAppPage } from "@/modules/common/types";
import { ILoginView } from "../../types";
import { EntityFields } from "@/modules/model";
import { logAndFallback } from "@/modules/common/error";
import { WithKeyFields } from "@/modules/model/IWithKey";

export async function getLoginDefinition(
  appPage: IAppPage
): Promise<Pick<ILoginView, "links">> {
  const keys = [
    "registration",
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
  return serviceGQuery<Pick<ILoginView, "links">>(subquery, {
    lang: appPage.lang,
    keys,
  }).then(data =>
    logAndFallback(data, { links: [] } as Pick<ILoginView, "links">)
  );
}
