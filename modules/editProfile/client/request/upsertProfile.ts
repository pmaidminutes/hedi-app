import { EditProfileInput, IUpsertProfileResponse } from "../../types";

export function upsertProfile(
  url: string,
  data: {
    profile?: EditProfileInput;
    lang: string;
  }
): Promise<IUpsertProfileResponse> {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(res => {
      //HACK temp code. after changing consultationHours from string to object, this code should be deleted
      const result = res as IUpsertProfileResponse;
      if (result.success && result.profile) {
        result.profile.consultationHours = JSON.parse(
          result.profile?.consultation_hours ?? "[]"
        );
      }
      return result;
    });
}
