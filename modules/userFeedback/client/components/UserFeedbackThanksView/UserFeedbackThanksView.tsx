import { getUser } from "@/modules/auth/client";
import { IAppPage } from "@/modules/common/types";
import { getCurrentUserProfile } from "@/modules/profile/request/getCurrentUserProfile";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { getCurrentUserHasFeedback } from "@/modules/userFeedback/request/getCurrentUserHasFeedback";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const UserFeedbackThanksView = ({ content }: { content: IAppPage }) => {
  const [user, loading] = getUser();
  const [currentProfile, currentProfileLoading] = getCurrentUserProfile(
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
  return (
    <SimplePageView
      url="/Pregnancy_pink80.svg"
      alt="Beschreibung des Bildes"
      content={content}>
      <div className="hedi-app-page-link-buttons">
        {content.elements.map(element => (
          <Link
            key={element.identifier + content.lang}
            href={"/" + content.lang + "/user/profile"}
            passHref>
            <a href={"/" + content.lang + "/user/profile"}>{element.value}</a>
          </Link>
        ))}
      </div>
    </SimplePageView>
  );
};
