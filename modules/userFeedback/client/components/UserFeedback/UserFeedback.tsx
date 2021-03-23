import { getUser } from "@/modules/auth/client";
import { IUserFeedbackView } from "@/modules/userFeedback/types";
import UserFeedbackForm from "@/modules/userFeedback/client/components/UserFeedbackForm/UserFeedbackForm";
import { getCurrentUserProfile } from "@/modules/editProfile/query/getCurrentUserProfile";

export const UserFeedback = ({
  content,
  locale,
}: {
  content: IUserFeedbackView;
  locale: string;
}) => {
  const [user] = getUser();
  if (!user) return null; //TODO senseful redirect
  const currentProfile = getCurrentUserProfile(locale);
  if (!currentProfile) return null; //TODO senseful redirect

  return (
    // <SimplePageView content={content}>
    <UserFeedbackForm
      content={content}
      locale={locale}
      className="hedi--user-feedback"
      profile={currentProfile}
    />
    // </SimplePageView>
  );
};
