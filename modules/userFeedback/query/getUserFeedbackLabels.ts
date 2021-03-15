// TODO: under development
import { IAppPage } from "@/modules/common/types";
import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { WithUIElementsFields } from "@/modules/model";

export async function getUserFeedbackLabels(lang = "de"): Promise<any> {
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
      const result: { [key: string]: string } = {};
      return data.appPagesByKey[0]?.elements || [];
    })
    .catch(e => {
      console.warn(e);
      return null;
    });
}
