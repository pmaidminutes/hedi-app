import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { IFeedback, mutateFeedbackAPIUrl } from "../../types";

export async function sendFeedbacks(
  userfeedbacks: Partial<IFeedback>[],
  lang: string
): Promise<IMutationResponse[] | null> {
  return new Promise<IMutationResponse[] | null>((resolve, reject) => {
    fetch(mutateFeedbackAPIUrl, {
      method: "POST",
      body: JSON.stringify({ lang, userfeedbacks }),
    })
      .then(resp => resp.json())
      .then(resp => resolve(resp))
      .catch(err => {
        err.text().then((errText: string) => reject(errText));
      });
  });
}
