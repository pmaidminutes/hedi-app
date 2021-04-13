import { gql, serviceGQuery } from "@/modules/graphql";
import { AppPageFields, IAppPage } from "@/modules/common/types";
import { IUserFeedbackView } from "../types";
import { EntityFields } from "@/modules/model";
import { getUIElementValue } from "@/modules/common/utils";
import { logAndFallback, logAndNull } from "@/modules/common/error";
import { getProfileDefinition } from "@/modules/profile/query/getProfileDefinition";
import { ProfileDefinition } from "@/modules/profile/types";

export async function getUserFeedbackStatic(
  lang: string
): Promise<IUserFeedbackView | null> {
  const query = gql`
    query getUserFeedbackStatic(
      $lang: String!
      $includeSelf: Boolean
    ) {
      appPages: appPagesByKey(keys: ["userfeedback"], lang: $lang) { ${AppPageFields} }
    }
  `;
  const appPage = await serviceGQuery<{ appPages: IAppPage[] }>(query, {
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
        ${AppPageFields}
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
        key
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
    }) as ProfileDefinition,
  };
}
