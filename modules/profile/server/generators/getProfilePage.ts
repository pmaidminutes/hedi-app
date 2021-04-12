import { getLangByRoute, segmentsToRoute } from "@/modules/common/utils";
import { IPageConfig } from "@/modules/shell/types";
import { getProfile } from "../../query";
import {
  getProfileDefinition,
  ProfileDefinition,
} from "../../query/getProfileDefinition";
import { Profile } from "../../types";

export type ProfileView = ProfileDefinition & Profile & IPageConfig;

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
