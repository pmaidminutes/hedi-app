import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { FeedbackType, mutateFeedbackAPIUrl } from "../../types";

export async function sendFeedbacks(
  type: FeedbackType,
  texts: string[]
): Promise<IMutationResponse | null> {
  return new Promise<IMutationResponse | null>((resolve, reject) => {
    fetch(mutateFeedbackAPIUrl, {
      method: "POST",
      body: JSON.stringify({ type, texts }),
    })
      .then(resp => resp.json())
      .then(resp => resolve(resp))
      .catch(err => {
        err.text().then((errText: string) => reject(errText));
      });
  });
}
