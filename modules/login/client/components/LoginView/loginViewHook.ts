import { useEffect } from "react";
import { useRouter } from "next/router";
import { getUser } from "@/modules/auth/client";

export const useLoginView = (redirect: string) => {
  const [user, loading] = getUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // TODO redirect to a better location
      router.push(redirect);
    }
  }, [user, loading, redirect]);
};
