// TODO: under development
import { IMutationResponse } from "@/modules/model/IMutationResponse";
import { IUserFeedbackInfo } from "../types/IUserFeedbackInfo";

export async function sendUserFeedback(
  userfeedback: IUserFeedbackInfo
): Promise<IMutationResponse | null> {
  return new Promise<IMutationResponse | null>((resolve, reject) => {
    fetch("/api/userfeedback/sendUserFeedback", {
      method: "POST",
      body: JSON.stringify(userfeedback),
    })
      .then(resp => resp.json())
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        // TODO: comment below line
        console.log(err);
        reject(err);
        // TODO: uncomment below line
        // err.text().then((errText: string) => reject(errText));
      });
  });
}
