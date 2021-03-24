import { getUser } from "@/modules/auth/client";
import { IUserFeedbackView } from "@/modules/userFeedback/types";
import UserFeedbackForm from "@/modules/userFeedback/client/components/UserFeedbackForm/UserFeedbackForm";
import { getCurrentUserProfile } from "@/modules/profile/query/getCurrentUserProfile";
import { useRouter } from "next/router";
import { tryGet } from "@/modules/common/utils";
import {
  Button,
  ButtonSet,
  Column,
  FormLabel,
  Row,
} from "carbon-components-react";
import { useEffect } from "react";

export const UserFeedback = ({
  content,
  locale,
}: {
  content: IUserFeedbackView;
  locale: string;
}) => {
  const [user, userIsLoading] = getUser();
  const router = useRouter();
  useEffect(() => {
    if (!userIsLoading && !user) router.push("/" + locale);
  }, [user, userIsLoading]);
  const [currentProfile, currentProfileIsLoading] = getCurrentUserProfile(
    user,
    locale
  );
  if (!currentProfileIsLoading && (!currentProfile || !currentProfile.route)) {
    const noProfileElement = tryGet("no_profile", content.elements);
    return (
      <Row>
        <Column>
          <ButtonSet stacked>
            <FormLabel>{noProfileElement?.description}</FormLabel>
            <Button href={"/" + locale + "/user/profile/edit"}>
              {noProfileElement?.value}
            </Button>
          </ButtonSet>
        </Column>
      </Row>
    );
  }

  return currentProfile ? (
    <UserFeedbackForm
      content={content}
      locale={locale}
      className="hedi--user-feedback"
      profile={currentProfile}
    />
  ) : null;
};
