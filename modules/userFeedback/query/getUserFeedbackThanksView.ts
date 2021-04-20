import { gql, serviceGQuery } from "@/modules/graphql";
import { getLangByRoute, getUIElementValue } from "@/modules/common/utils";
import { AppPagesGQL } from "@/modules/common/query";
import { IAppPage } from "@/modules/common/types";
import { IUserFeedbackThanksView } from "../types/IUserFeedbackThanksView";
import { EntityFields } from "@/modules/model";
import { logAndFallback } from "@/modules/common/error";
import { WithKeyFields } from "@/modules/model/IWithKey";

export async function getUserFeedbackThanksView(
  route: string
): Promise<IUserFeedbackThanksView | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getUserFeedbackThanksView(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      ${AppPagesGQL}
    }
  `;
  const { appPages } = await serviceGQuery<{ appPages: IAppPage[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndFallback(data, { appPages: [] as IAppPage[] }));

  if (!(appPages?.[0] && appPages[0].key === "userfeedbackThanks")) return null;
  const appPage = appPages[0];

  appPage.type = "UserFeedbackThanks";
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
  const linkResults = await serviceGQuery<
    Pick<IUserFeedbackThanksView, "links">
  >(queryForLinks, {
    lang,
    keys,
  }).then(data =>
    logAndFallback(data, { links: [] } as Pick<
      IUserFeedbackThanksView,
      "links"
    >)
  );
  return { ...appPage, ...linkResults };
}
