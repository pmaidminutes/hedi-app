import { ProfileListView } from "@/modules/profile/query";
import useSWR, { mutate } from "swr";
import { jsonFetcher } from "@/modules/common/utils";

export function useProfileList(
  initialData: ProfileListView,
  routePath: string
) {
  const apiPath = "/api/profile/?route=" + routePath;
  const response = useSWR<ProfileListView>(apiPath, jsonFetcher, {
    initialData: initialData,
    revalidateOnMount: true,
    refreshInterval: 5000,
  });
  return { ...response };
}
