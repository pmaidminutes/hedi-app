import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { IUserFeedback } from "../../types";

export async function sendUserFeedbacks(
  userfeedbacks: Partial<IUserFeedback>[],
  lang: string
): Promise<IMutationResponse[] | null> {
  return new Promise<IMutationResponse[] | null>((resolve, reject) => {
    fetch("/api/userfeedback", {
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
