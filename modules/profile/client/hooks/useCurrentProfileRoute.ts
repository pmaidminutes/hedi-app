import { User } from "next-auth";
import { useEffect, useState } from "react";
import { requestCurrentProfileRoute } from "../request";

export function useCurrentProfileRoute(
  user: User | undefined,
  lang: string
): [string | null, boolean] {
  const [profileRoute, setProfileRoute] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentProfileRoute = async () => {
      setIsLoading(true);
      const route = await requestCurrentProfileRoute(lang).catch(() =>
        setIsLoading(false)
      );
      if (route) setProfileRoute(route);

      setIsLoading(false);
    };

    // we can trigger without waiting on user info
    // api does serverside validation anyways
    fetchCurrentProfileRoute();
  }, [user?.name, lang]);

  return [profileRoute, isLoading];
}
