import { jsonPost } from "@/modules/common/utils";
import { userProfileRouteAPIUrl } from "../../types";

export const requestCurrentProfileRoute = (
  lang: string
): Promise<string | null> =>
  jsonPost<string>(userProfileRouteAPIUrl, { lang }, true);
