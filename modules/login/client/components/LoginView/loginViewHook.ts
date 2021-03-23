import { getUser } from "@/modules/auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useLoginView = (redirect: string) => {
  const [user, loading] = getUser();
  const router = useRouter();
  useEffect(() => {
    if (!loading && user) {
      // TODO redirect to a better location
      console.log("redirectsssss");
      router.push(redirect);
    }
  }, [user, loading]);
};
