import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { AppPageFields, IAppPage } from "@/modules/common/types";
import { IUserFeedbackView } from "../types";
import { EntityFields } from "@/modules/model";
import { getUIElementValue } from "@/modules/common/utils";

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
  const client = await getServiceClient(GQLEndpoint.Internal);
  const { appPages } = await client
    .request<{ appPages: IAppPage[] }>(query, { lang })
    .catch(e => {
      console.warn(e);
      return { appPages: [] };
    });

  if (!(appPages?.[0] && appPages[0].key === "userfeedback")) return null;

  const appPage = appPages[0];
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
  const { subPages } = await client.request<{
    subPages: IAppPage[];
  }>(subquery, {
    lang,
  });
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
  const linkResults = await client.request<Pick<IUserFeedbackView, "links">>(
    queryForLinks,
    {
      lang,
      keys,
    }
  );
  return {
    ...appPage,
    subPages,
    ...linkResults,
  };
}
