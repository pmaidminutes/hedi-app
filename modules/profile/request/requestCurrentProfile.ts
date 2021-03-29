import { jsonPost } from "@/modules/common/utils";
import { ProfileView } from "../query";

export const requestCurrentProfile = (
  lang: string
): Promise<ProfileView | null> =>
  jsonPost<ProfileView>("/api/user/profile", { lang });
