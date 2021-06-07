import { requestCurrentProfile } from "../request";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import { IUserProfile } from "../../types";

export function useCurrentProfile(
  user: User | undefined,
  lang: string
): [IUserProfile | null, boolean] {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentProfile = async () => {
      setIsLoading(true);
      const profile = await requestCurrentProfile(lang).catch(() =>
        setIsLoading(false)
      );
      if (profile) setProfile(profile);

      setIsLoading(false);
    };

    // we can trigger without waiting on user info
    // api does serverside validation anyways
    fetchCurrentProfile();
  }, [user?.name, lang]);

  return [profile, isLoading];
}
