import { getUser } from "@/modules/auth/client";
import ProfileTestFeedbackForm from "../FeedbackForm/ProfileTestFeedbackForm";
import { useCurrentProfile } from "@/modules/profile/client/hooks";
import {
  ButtonSet,
  Column,
  ColumnDefaultProps,
  FormLabel,
  Row,
} from "carbon-components-react";
import { useRouter } from "next/router";
import { IPage } from "@/modules/page/types";
import {
  findButtonInstance,
  findLinkInstance,
} from "@/modules/components/types";
import { Button } from "@/modules/components";

export const FeedbackView = ({
  content,
  leftColumnProps,
  rightColumnProps,
  centerProps,
}: {
  content: IPage;
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
    const noProfileButton = findButtonInstance(
      content.components,
      "no_profile"
    );
    const noProfileRedirect = findLinkInstance(
      content.components,
      "no_profile_redirect"
    );
    return (
      <Row>
        <Column>
          {noProfileButton && (
            <ButtonSet stacked>
              <FormLabel>{noProfileButton?.labelText}</FormLabel>
              <Button
                {...noProfileButton}
                onClick={() => router.push(noProfileRedirect?.href || "/")}
              />
            </ButtonSet>
          )}
        </Column>
      </Row>
    );
  }

  return currentProfile ? (
    <ProfileTestFeedbackForm
      content={content}
      leftColumnProps={leftColumnProps}
      rightColumnProps={rightColumnProps}
      centerProps={centerProps}
    />
  ) : null;
};
