import { getUser } from "@/modules/auth/client";
import { useCurrentProfileRoute } from "@/modules/profile/client/hooks";
import { getCurrentUserHasFeedback } from "../../request/getCurrentUserHasFeedback";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IPage } from "@/modules/page/types";
import {
  findButtonInstance,
  findLinkInstance,
  findBodyInstance,
} from "@/modules/components/types";

export function useFeedbackThanksView({ content }: { content: IPage }) {
  const { components } = content;

  const [user, isLoading] = getUser();
  const [
    currentProfileRoute,
    currentProfileRouteIsLoading,
  ] = useCurrentProfileRoute(user, content.lang);
  const [hasFeedback, hasFeedbackLoading] = getCurrentUserHasFeedback(user);

  const router = useRouter();
  const noProfileRoute =
    findLinkInstance(components, "noProfileRoute")?.href || "/";
  const noFeedbackRoute =
    findLinkInstance(components, "noFeedbackRoute")?.href || "/";

  const backRoute = findLinkInstance(components, "backRoute")?.href || "/";
  const backButton = findButtonInstance(components, "backButton");
  const body = findBodyInstance(components, "body");

  useEffect(() => {
    if (!isLoading && !user) router.push("/" + content.lang);
    else if (!currentProfileRouteIsLoading && !currentProfileRoute) {
      router.push(noProfileRoute);
    } else if (!hasFeedbackLoading && hasFeedback !== true)
      router.push(noFeedbackRoute);
  }, [
    user,
    isLoading,
    currentProfileRoute,
    currentProfileRouteIsLoading,
    hasFeedback,
    hasFeedbackLoading,
  ]);

  return { backRoute, backButton, body };
}
