import { getUser } from "@/modules/auth/client";
import { IAppPage } from "@/modules/common/types";
import { useCurrentProfileEntity } from "@/modules/profile/client/hooks";
import { getCurrentUserHasFeedback } from "@/modules/userFeedback/client/request/getCurrentUserHasFeedback";
import { useRouter } from "next/router";
import { useEffect } from "react";

export interface IUserFeedbackThanksProps {
  content: IAppPage;
}

export function useFeedbackThanksView(props: IUserFeedbackThanksProps) {
  const { content } = props;
  const { elements } = content;

  const [user, loading] = getUser();
  const [currentProfile, currentProfileLoading] = useCurrentProfileEntity(
    user,
    content.lang
  );
  const [hasFeedback, hasFeedbackLoading] = getCurrentUserHasFeedback(user);

  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) router.push("/" + content.lang);
    else if (
      !currentProfileLoading &&
      (!currentProfile || !currentProfile.route)
    ) {
      router.push("/" + content.lang + "/user/profile/edit");
    } else if (!hasFeedbackLoading && hasFeedback !== true)
      router.push("/" + content.lang + "/user/profile/feedback");
  }, [
    user,
    loading,
    currentProfile,
    currentProfileLoading,
    hasFeedback,
    hasFeedbackLoading,
  ]);

  return { content, elements };
}
