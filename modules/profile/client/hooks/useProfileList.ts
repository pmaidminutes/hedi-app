import useSWR from "swr";
import { jsonFetcher } from "@/modules/common/utils";
import { Profile } from "../../types";

export function useProfileList(initialData: Profile[], lang: string) {
  const response = useSWR<Profile[]>(
    ["/api/profiles", lang, initialData],
    jsonFetcher,
    {
      initialData: initialData,
      revalidateOnMount: true,
      refreshInterval: 5000,
      loadingTimeout: 5000,
      errorRetryInterval: 60000,
    }
  );
  return { ...response };
}