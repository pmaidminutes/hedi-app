import { getUser } from "@/modules/auth/client";
import { useRouter } from "next/router";
import { DependencyList, useEffect } from "react";

export const useAuthorizedRedirect = (
  redirectUrl: string,
  deps?: DependencyList
): void => {
  const [user, isLoading] = getUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // redirects to landing pages
      router.push(redirectUrl);
    }
  }, [user, isLoading, ...(deps ? deps : [])]);
};
