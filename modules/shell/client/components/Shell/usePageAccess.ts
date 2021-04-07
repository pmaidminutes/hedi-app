import { getUser } from "@/modules/auth/client";
import { AssertClientSide } from "@/modules/common/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const usePageAccess = (redirectUnAuthorized?: string) => {
  const [pageAccess, setPageAccess] = useState(!redirectUnAuthorized);
  const router = useRouter();
  const [user, loading] = getUser();
  useEffect(() => {
    if (!redirectUnAuthorized) setPageAccess(true);
    else {
      setPageAccess(false);
      if (loading) {
        setPageAccess(false);
        router.prefetch(redirectUnAuthorized);
      } else if (user) setPageAccess(true);
      else if (typeof redirectUnAuthorized === "string" && AssertClientSide()) {
        router.push(redirectUnAuthorized, redirectUnAuthorized, {
          shallow: false,
        });
      }
    }
  }, [redirectUnAuthorized, user, loading]);
  return pageAccess;
};
