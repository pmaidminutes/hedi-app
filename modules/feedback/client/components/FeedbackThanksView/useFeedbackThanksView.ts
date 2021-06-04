import { getUser } from "@/modules/auth/client";
import { useCurrentProfileEntity } from "@/modules/profile/client/hooks";
import { getCurrentUserHasFeedback } from "../../request/getCurrentUserHasFeedback";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IPage } from "@/modules/page/types";
import {
  findButtonInstance,
  findLinkInstance,
  findBodyInstance,
} from "@/modules/model/components";

export function useFeedbackThanksView({ content }: { content: IPage }) {
  const { components } = content;

  const [user, isLoading] = getUser();
  const [currentProfile, currentProfileLoading] = useCurrentProfileEntity(
    user,
    content.lang
  );
  const [hasFeedback, hasFeedbackLoading] = getCurrentUserHasFeedback(user);

  const router = useRouter();
  const noProfileRoute =
    findLinkInstance(components, "no_profile_redirect")?.href || "/";
  const noFeedbackRoute =
    findLinkInstance(components, "no_feedback_redirect")?.href || "/";

  const backRoute = findLinkInstance(components, "back_page")?.href || "/";
  const backButton = findButtonInstance(components, "back");
  const body = findBodyInstance(components, "text");

  useEffect(() => {
    if (!isLoading && !user) router.push("/" + content.lang);
    else if (
      !currentProfileLoading &&
      (!currentProfile || !currentProfile.route)
    ) {
      router.push(noProfileRoute);
    } else if (!hasFeedbackLoading && hasFeedback !== true)
      router.push(noFeedbackRoute);
  }, [
    user,
    isLoading,
    currentProfile,
    currentProfileLoading,
    hasFeedback,
    hasFeedbackLoading,
  ]);

  return { backRoute, backButton, body };
}
