import { EditProfileInput, IUpsertProfile } from "../../types";

export function upsertProfile(
  url: string,
  data: {
    profile?: EditProfileInput;
    lang: string;
  }
): Promise<IUpsertProfile> {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  }).then(res => res.json());
}
