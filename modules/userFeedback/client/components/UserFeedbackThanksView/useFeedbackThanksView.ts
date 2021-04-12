import { getUser } from "@/modules/auth/client";
import { IAppPage } from "@/modules/common/types";
import { getUIElementRedirectRoute } from "@/modules/common/utils";
import { useCurrentProfileEntity } from "@/modules/profile/client/hooks";
import { getCurrentUserHasFeedback } from "@/modules/userFeedback/client/request/getCurrentUserHasFeedback";
import { IUserFeedbackThanksView } from "@/modules/userFeedback/types/IUserFeedbackThanksView";
import { useRouter } from "next/router";
import { useEffect } from "react";

export interface IUserFeedbackThanksProps {
  content: IUserFeedbackThanksView;
}

export function useFeedbackThanksView(props: IUserFeedbackThanksProps) {
  const { content } = props;
  const { elements, links } = content;

  const [user, isLoading] = getUser();
  const [currentProfile, currentProfileLoading] = useCurrentProfileEntity(
    user,
    content.lang
  );
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

  return { content, elements, links };
}
