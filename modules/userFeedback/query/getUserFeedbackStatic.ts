import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { AppPageFields, IAppPage } from "@/modules/common/types";
import { IUserFeedbackView } from "../types";

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
      subPages: appPagesByKey(keys: ["userfeedback_languages","userfeedback_contact_freetimes","userfeedback_usage","userfeedback_profile","userfeedback_activities","userfeedback_summary","userfeedbackThanks"], lang: $lang) {
        ${AppPageFields}
      }
    }
  `;
  const { subPages } = await client.request<{
    subPages: IAppPage[];
  }>(subquery, {
    lang,
  });

  return {
    ...appPage,
    subPages,
  };
}
