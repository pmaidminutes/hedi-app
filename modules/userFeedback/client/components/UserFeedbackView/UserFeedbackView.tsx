import { getUser } from "@/modules/auth/client";
import { IUserFeedbackView } from "@/modules/userFeedback/types";
import UserFeedbackForm from "@/modules/userFeedback/client/components/UserFeedbackForm/UserFeedbackForm";
import { useCurrentProfile } from "@/modules/profile/client/hooks";
import {
  getUIElement,
  getUIElementRedirectRoute,
} from "@/modules/common/utils";
import {
  Button,
  ButtonSet,
  Column,
  ColumnDefaultProps,
  FormLabel,
  Row,
} from "carbon-components-react";
import { useRouter } from "next/router";

export const UserFeedbackView = ({
  content,
  leftColumnProps,
  rightColumnProps,
  centerProps,
}: {
  content: IUserFeedbackView;
  leftColumnProps?: ColumnDefaultProps;
  rightColumnProps?: ColumnDefaultProps;
  centerProps?: ColumnDefaultProps;
}) => {
  const [user, userIsLoading] = getUser();
  const [currentProfile, currentProfileIsLoading] = useCurrentProfile(
    user,
    content.lang
  );
  const router = useRouter();
  if (!currentProfileIsLoading && (!currentProfile || !currentProfile.route)) {
    const noProfileElement = getUIElement("no_profile", content.elements);
    const noProfileRedirect = getUIElementRedirectRoute(
      "no_profile_redirect",
      content.elements,
      content.links
    );
    return (
      <Row>
        <Column>
          <ButtonSet stacked>
            <FormLabel>{noProfileElement?.description}</FormLabel>
            <Button onClick={() => router.push(noProfileRedirect)}>
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
      profile={{ ...currentProfile, ...content.profileDefinition }}
      locale={content.lang}
      leftColumnProps={leftColumnProps}
      rightColumnProps={rightColumnProps}
      centerProps={centerProps}
    />
  ) : null;
};
