import { gql, serviceGQuery } from "@/modules/graphql";
import { getUIElementValue } from "@/modules/common/utils";
import { IAppPage } from "@/modules/common/types";
import { IUserFeedbackThanksView } from "../../types/IUserFeedbackThanksView";
import { EntityFields } from "@/modules/model";
import { logAndFallback } from "@/modules/common/error";
import { WithKeyFields } from "@/modules/model/IWithKey";

export async function getUserFeedbackThanksDefinition(
  appPage: IAppPage
): Promise<Pick<IUserFeedbackThanksView, "links">> {
  const keys = [
    getUIElementValue("no_profile_redirect", appPage.elements),
    getUIElementValue("back_page", appPage.elements),
    getUIElementValue("no_feedback_redirect", appPage.elements),
  ];

  const queryForLinks = gql`
      query getFeedbackViewOtherLinks(
        $keys: [String!]!
        $lang: String!
      ) {
        links: appPagesByKey(keys: $keys, lang: $lang) {
          ${WithKeyFields}
          ${EntityFields}
        }
      }
    `;
  return serviceGQuery<Pick<IUserFeedbackThanksView, "links">>(queryForLinks, {
    lang: appPage.lang,
    keys,
  }).then(data =>
    logAndFallback(data, { links: [] } as Pick<
      IUserFeedbackThanksView,
      "links"
    >)
  );
}
