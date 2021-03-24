import { ProfileView } from "@/modules/profile/query";
import { getCurrentProfile } from "@/modules/profile/request/getCurrentProfile";
import useSWR from "swr";

export function getCurrentUserProfile(lang: string): ProfileView | undefined {
  const { data } = useSWR("/api/user/currentProfile", url =>
    getCurrentProfile(url, { lang })
  );
  return data;
}
