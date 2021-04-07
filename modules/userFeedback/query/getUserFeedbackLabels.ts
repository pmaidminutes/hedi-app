import { IAppPage } from "@/modules/common/types";
import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { IUIElementTexts, WithUIElementsFields } from "@/modules/model";

// UNUSED
export async function getUserFeedbackLabels(
  lang = "de"
): Promise<IUIElementTexts[] | null> {
  const query = gql`
    query getUserFeedbackLabels(
      $keys: [String!]!
      $lang: String!
      ) {
        appPagesByKey(keys:$keys, lang: $lang) {
          ${WithUIElementsFields}
        }
      }
  `;

  const client = await getServiceClient(GQLEndpoint.Internal);
  return client
    .request<{ appPagesByKey: IAppPage[] }>(query, {
      keys: ["userfeedback"],
      lang,
    })
    .then(data => {
      return data.appPagesByKey[0]?.elements || null;
    })
    .catch(e => {
      console.warn(e);
      return null;
    });
}
