import { useEffect } from "react";
import { useRouter } from "next/router";
import { getUser } from "@/modules/auth/client";
import { useCurrentProfileRoute } from "../../hooks";

export const useProfilePreview = (lang: string) => {
  const router = useRouter();
  const [user, userIsLoading] = getUser();
  const [
    currentProfileRoute,
    currentProfileRouteIsLoading,
  ] = useCurrentProfileRoute(user, lang);
  useEffect(() => {
    console.log(currentProfileRoute);
    if (!currentProfileRouteIsLoading && currentProfileRoute)
      router.push(currentProfileRoute);
  }, [
    user?.name,
    userIsLoading,
    currentProfileRoute,
    currentProfileRouteIsLoading,
  ]);

  return { currentProfileRouteIsLoading };
};
