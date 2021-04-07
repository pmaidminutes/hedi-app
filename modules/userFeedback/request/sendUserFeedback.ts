import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { IUserFeedback, mutateUserFeedbackAPIUrl } from "../types";

export async function sendUserFeedbacks(
  userfeedbacks: Partial<IUserFeedback>[],
  lang: string
): Promise<IMutationResponse[] | null> {
  return new Promise<IMutationResponse[] | null>((resolve, reject) => {
    fetch(mutateUserFeedbackAPIUrl, {
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
