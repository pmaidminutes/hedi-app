import { getLangByRoute, segmentsToRoute } from "@/modules/common/utils";
import { getProfile } from "../../query";
import { getProfileDefinition } from "../../query/getProfileDefinition";
import { ProfileView } from "../../types";

export const getProfilePage = async (
  segments?: string[],
  locale = "de"
): Promise<ProfileView | null> => {
  if (!segments) return null;
  const route = segmentsToRoute(segments, locale);
  const definition = await getProfileDefinition(
    getLangByRoute(route) ?? locale
  );
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
