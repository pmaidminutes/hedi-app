import { jsonPost } from "@/modules/common/utils";
import { Profile, userProfileAPIUrl } from "../../types";

export const requestCurrentProfile = (lang: string): Promise<Profile | null> =>
  jsonPost<Profile>(userProfileAPIUrl, { lang });
