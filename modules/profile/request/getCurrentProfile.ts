import { ProfileView } from "../query";

export function getCurrentProfile(lang: string): Promise<ProfileView> {
  return fetch("/api/user/profile", {
    method: "POST",
    body: JSON.stringify({ lang }),
  }).then(res => res.json());
}
