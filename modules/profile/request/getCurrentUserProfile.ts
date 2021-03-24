import { ProfileView } from "@/modules/profile/query";
import { getCurrentProfile } from "@/modules/profile/request/getCurrentProfile";
import { User } from "next-auth";
import { useEffect, useState } from "react";

export function getCurrentUserProfile(
  user: User | undefined,
  lang: string
): [ProfileView | null, boolean] {
  const [profile, setProfile] = useState<ProfileView | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestHasFeedback = async () => {
      setLoading(true);
      const resp = await getCurrentProfile("/api/user/currentProfile", {
        lang,
      });
      if (resp) setProfile(resp);

      setLoading(false);
    };

    if (user) requestHasFeedback();
  }, [user]);

  return [profile, loading];
}
