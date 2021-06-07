import { jsonPost } from "@/modules/common/utils";
import { IUserProfile, userProfileAPIUrl } from "../../types";

export const requestCurrentProfile = (
  lang: string
): Promise<IUserProfile | null> =>
  jsonPost<IUserProfile>(userProfileAPIUrl, { lang });
