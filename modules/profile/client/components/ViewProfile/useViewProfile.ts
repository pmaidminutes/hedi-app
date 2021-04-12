import { useEffect } from "react";
import { useRouter } from "next/router";
import { getUser } from "@/modules/auth/client";
import { useCurrentProfileEntity } from "../../hooks";

export const useViewProfile = (lang: string) => {
  const router = useRouter();
  const [user, userIsLoading] = getUser();
  const [currentProfile, currentProfileIsLoading] = useCurrentProfileEntity(
    user,
    lang
  );
  useEffect(() => {
    if (!currentProfileIsLoading && currentProfile)
      router.push(currentProfile.route);
  }, [
    user?.name,
    userIsLoading,
    currentProfile?.route,
    currentProfileIsLoading,
  ]);

  return { currentProfileIsLoading };
};
