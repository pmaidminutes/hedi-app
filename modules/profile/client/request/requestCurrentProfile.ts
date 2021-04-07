import { jsonPost } from "@/modules/common/utils";
import { ProfileView } from "../../query";
import { userProfileAPIUrl } from "../../types";

export const requestCurrentProfile = (
  lang: string
): Promise<ProfileView | null> =>
  jsonPost<ProfileView>(userProfileAPIUrl, { lang });
