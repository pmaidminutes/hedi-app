import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { getLangByRoute, getUIElementValue } from "@/modules/common/utils";
import { AppPagesGQL } from "@/modules/common/query";
import { IAppPage } from "@/modules/common/types";
import { IUserFeedbackThanksView } from "../types/IUserFeedbackThanksView";
import { EntityFields } from "@/modules/model";

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
  const client = await getServiceClient(GQLEndpoint.Internal);
  const { appPages } = await client
    .request<{ appPages: IAppPage[] }>(query, {
      routes: [route],
      lang,
    })
    .catch(e => {
      console.warn(e);
      return { appPages: [] };
    });

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
          key
          ${EntityFields}
        }
      }
    `;
  const linkResults = await client.request<
    Pick<IUserFeedbackThanksView, "links">
  >(queryForLinks, {
    lang,
    keys,
  });
  return { ...appPage, ...linkResults };
}
