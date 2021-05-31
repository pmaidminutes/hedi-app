import { gql, serviceGQuery } from "@/modules/graphql";
import { AppPageGQL, IAppPage } from "@/modules/common/types";
import { IUserFeedbackView } from "../../types";
import { EntityFields } from "@/modules/model";
import { getUIElementValue } from "@/modules/common/utils";
import { logAndFallback } from "@/modules/common/error";
import { getProfileDefinition } from "@/modules/profile/server/query/getProfileDefinition";
import { WithKeyFields } from "@/modules/model/IWithKey";

export async function getUserFeedbackDefinition(
  appPage: IAppPage
): Promise<Omit<IUserFeedbackView, keyof IAppPage>> {
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
    lang: appPage.lang,
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
      lang: appPage.lang,
      keys,
    }
  ).then(data =>
    logAndFallback(data, { links: [] } as Pick<IUserFeedbackView, "links">)
  );
  const profileDefinition =
    (await getProfileDefinition(appPage.lang)) ?? undefined;

  return {
    subPages,
    ...linkResults,
    profileDefinition,
  };
}
