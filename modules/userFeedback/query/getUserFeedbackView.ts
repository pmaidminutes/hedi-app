import { gql, serviceGQuery } from "@/modules/graphql";
import { AppPageGQL, IAppPage } from "@/modules/common/types";
import { IUserFeedbackView } from "../types";
import { EntityFields } from "@/modules/model";
import { getLangByRoute, getUIElementValue } from "@/modules/common/utils";
import { logAndFallback, logAndNull } from "@/modules/common/error";
import { AppPagesGQL } from "@/modules/common/query";
import { getProfileDefinition } from "@/modules/profile/query/getProfileDefinition";
import { IProfileDefinition } from "@/modules/profile/types";
import { WithKeyFields } from "@/modules/model/IWithKey";

export async function getUserFeedbackView(
  route: string
): Promise<IUserFeedbackView | null> {
  const lang = getLangByRoute(route) ?? "de";

  const query = gql`
    query getUserFeedback(
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

  if (!(appPage && appPage.key === "userfeedback")) return null;

  appPage.type = "UserFeedback";

  const subquery = gql`
    query getUserFeedbackChildren(
      $lang: String!
      $includeSelf: Boolean
    ) {
      subPages: appPagesByKey(keys: ["userfeedback_languages","userfeedback_contact_freetimes","userfeedback_usage","userfeedback_profile","userfeedback_activities","userfeedback_summary"], lang: $lang) {
        ${AppPageGQL}
      }
    }
  `;
  const { subPages } = await serviceGQuery<{
    subPages: IAppPage[];
  }>(subquery, {
    lang,
  }).then(data => logAndFallback(data, { subPages: [] as IAppPage[] }));
  const keys = [
    getUIElementValue("no_profile_redirect", appPage.elements),
    getUIElementValue("success_redirect", appPage.elements),
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
  const linkResults = await serviceGQuery<Pick<IUserFeedbackView, "links">>(
    queryForLinks,
    {
      lang,
      keys,
    }
  ).then(data =>
    logAndFallback(data, { links: [] } as Pick<IUserFeedbackView, "links">)
  );
  const profileDefinition = await getProfileDefinition(lang).then(def =>
    logAndNull(def)
  );

  return {
    ...appPage,
    subPages,
    ...linkResults,
    profileDefinition: (profileDefinition ?? {
      elements: [],
      links: [],
    }) as IProfileDefinition,
  };
}
