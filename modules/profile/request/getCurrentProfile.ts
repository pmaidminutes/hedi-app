import { ProfileView } from "../query";

export function getCurrentProfile(
  url: string,
  data: {
    lang: string;
  }
): Promise<ProfileView> {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  }).then(res => res.json());
}
