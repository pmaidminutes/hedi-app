import { getUser } from "@/modules/auth/client";
import { IUserFeedbackView } from "@/modules/userFeedback/types";
import UserFeedbackForm from "@/modules/userFeedback/client/components/UserFeedbackForm/UserFeedbackForm";
import { useCurrentProfile } from "@/modules/profile/client/hooks";
import { getUIElement } from "@/modules/common/utils";
import {
  Button,
  ButtonSet,
  Column,
  ColumnDefaultProps,
  FormLabel,
  Row,
} from "carbon-components-react";
import { SimplePageView } from "@/modules/simplePage/client/components";

export const UserFeedbackView = ({
  content,
  locale,
  leftColumnProps,
  rightColumnProps,
  centerProps,
}: {
  content: IUserFeedbackView;
  locale: string;
  leftColumnProps?: ColumnDefaultProps;
  rightColumnProps?: ColumnDefaultProps;
  centerProps?: ColumnDefaultProps;
}) => {
  const [user, userIsLoading] = getUser();
  const [currentProfile, currentProfileIsLoading] = useCurrentProfile(
    user,
    locale
  );
  if (!currentProfileIsLoading && (!currentProfile || !currentProfile.route)) {
    const noProfileElement = getUIElement("no_profile", content.elements);
    return (
      <SimplePageView content={content}>
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
      </SimplePageView>
    );
  }

  return currentProfile ? (
    <SimplePageView content={content}>
      <UserFeedbackForm
        content={content}
        locale={locale}
        profile={currentProfile}
        leftColumnProps={leftColumnProps}
        rightColumnProps={rightColumnProps}
        centerProps={centerProps}
      />
    </SimplePageView>
  ) : null;
};
