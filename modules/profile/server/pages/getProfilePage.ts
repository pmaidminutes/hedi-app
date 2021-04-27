import { getLangByRoute } from "@/modules/common/utils";
import { getProfile } from "../../query";
import { getProfileDefinition } from "../../query/getProfileDefinition";
import { ProfileView } from "../../types";

export const getProfilePage = async (
  route: string
): Promise<ProfileView | null> => {
  const definition = await getProfileDefinition(getLangByRoute(route) ?? "de");
  const content = await getProfile(route);

  if (!content || !definition) return null;

  return {
    ...definition,
    ...content,
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
    revalidate: 1,
  };
};
