import { getUser } from "@/modules/auth/client";
import { AssertClientSide } from "@/modules/common/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const usePageAccess = (redirectUnAuthorized?: string) => {
  const [hasPageAccess, setHasPageAccess] = useState(!redirectUnAuthorized);
  const router = useRouter();
  const [user, isLoading] = getUser();
  useEffect(() => {
    if (!redirectUnAuthorized) setHasPageAccess(true);
    else {
      setHasPageAccess(false);
      if (isLoading) {
        setHasPageAccess(false);
        router.prefetch(redirectUnAuthorized);
      } else if (user) setHasPageAccess(true);
      else if (typeof redirectUnAuthorized === "string" && AssertClientSide()) {
        router.push(redirectUnAuthorized, redirectUnAuthorized, {
          shallow: false,
        });
      }
    }
  }, [redirectUnAuthorized, user, isLoading]);
  return hasPageAccess;
};
