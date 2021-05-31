import { getUser } from "@/modules/auth/client";
import {
  getUIElement,
  getUIElementRedirectRoute,
} from "@/modules/common/utils";
import { useCurrentProfileRoute } from "@/modules/profile/client/hooks";
import { getCurrentUserHasFeedback } from "@/modules/userFeedback/client/request/getCurrentUserHasFeedback";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IUserFeedbackThanksView } from "../../../types";

export function useFeedbackThanksView({
  content,
}: {
  content: IUserFeedbackThanksView;
}) {
  const { elements, links } = content;

  const [user, isLoading] = getUser();
  const [
    currentProfileRoute,
    currentProfileRouteIsLoading,
  ] = useCurrentProfileRoute(user, content.lang);
  const [hasFeedback, hasFeedbackLoading] = getCurrentUserHasFeedback(user);

  const router = useRouter();
  const noProfileRoute = getUIElementRedirectRoute(
    "no_profile_redirect",
    elements,
    links
  );
  const noFeedbackRoute = getUIElementRedirectRoute(
    "no_feedback_redirect",
    elements,
    links
  );

  const backRoute = getUIElementRedirectRoute("back_page", elements, links);
  const element = getUIElement("back", elements);
  const key = element?.identifier + content.lang;
  const tooltip = element?.value;
  const buttonValue = element?.value;

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

  return { backRoute, key, tooltip, buttonValue };
}
