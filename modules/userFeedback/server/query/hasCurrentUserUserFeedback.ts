import { gql, userGQuery } from "@/modules/graphql";

import { IAuthHeader } from "@/modules/auth/types";
import { logAndFallback } from "@/modules/common/error";

export async function hasCurrentUserUserFeedback(
  authHeader: IAuthHeader
): Promise<boolean | null> {
  const query = gql`
    query currentUserUserFeedbacksQuery {
      currentUserUserFeedbacks {
        route
      }
    }
  `;

  const queryResult = await userGQuery<{
    currentUserUserFeedbacks: { route: string }[];
  }>(authHeader, query).then(data =>
    logAndFallback(data, {
      currentUserUserFeedbacks: [] as { route: string }[],
    })
  );
  return queryResult.currentUserUserFeedbacks.length > 0;
}
