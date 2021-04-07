import { IEntity } from "@/modules/model";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import { requestCurrentProfileEntity } from "../request";

export function useCurrentProfileEntity(
  user: User | undefined,
  lang: string
): [IEntity | null, boolean] {
  const [profile, setProfile] = useState<IEntity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentProfileEntity = async () => {
      setLoading(true);
      const entity = await requestCurrentProfileEntity(lang).catch(() =>
        setLoading(false)
      );
      if (entity) setProfile(entity);

      setLoading(false);
    };

    // we can trigger without waiting on user info
    // api does serverside validation anyways
    fetchCurrentProfileEntity();
  }, [user?.name, lang]);

  return [profile, loading];
}
