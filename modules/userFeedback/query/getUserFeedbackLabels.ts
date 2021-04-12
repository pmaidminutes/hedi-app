import { logAndNull } from "@/modules/common/error";
import { IAppPage } from "@/modules/common/types";
import { gql, serviceGQuery } from "@/modules/graphql";
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

  return serviceGQuery<{ appPagesByKey: IAppPage[] }>(query, {
    keys: ["userfeedback"],
    lang,
  }).then(data => logAndNull(data)?.appPagesByKey?.[0].elements ?? null);
}
