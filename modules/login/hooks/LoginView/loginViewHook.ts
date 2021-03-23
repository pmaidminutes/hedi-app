import { getUser } from "@/modules/auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useLoginView = (redirect: string) => {
  const [user, loading] = getUser();
  const router = useRouter();
  useEffect(() => {
    if (!loading && user) {
      // redirects to landing pages
      router.push(redirect);
    }
  }, [user, loading]);
};
