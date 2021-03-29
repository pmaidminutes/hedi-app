import { getUser } from "@/modules/auth/client";
import { useRouter } from "next/router";
import { DependencyList, useEffect } from "react";

export const useAuthorizedRedirect = (
  redirectUrl: string,
  deps?: DependencyList
): void => {
  const [user, loading] = getUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // redirects to landing pages
      router.push(redirectUrl);
    }
  }, [user, loading, ...(deps ? deps : [])]);
};
