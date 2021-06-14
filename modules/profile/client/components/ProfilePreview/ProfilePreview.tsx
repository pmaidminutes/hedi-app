import { Column, Row, Loading } from "carbon-components-react";

import { ITyped } from "@/modules/model";
import { IPage } from "@/modules/page/types";

import { useProfilePreview } from "./useProfilePreview";
import { findButtonInstance, Button } from "@/modules/components";

export const TryProfilePreview = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "ProfilePreview" ? (
    <ProfilePreview content={content as IPage} />
  ) : null;

export const ProfilePreview = ({ content }: { content: IPage }) => {
  const { currentProfileRouteIsLoading } = useProfilePreview(content.lang);

  const profileEditButton = findButtonInstance(
    content.components,
    "profileEditButton"
  );
  return (
    <>
      {currentProfileRouteIsLoading ? (
        <Loading />
      ) : (
        <Row>
          <Column>
            {profileEditButton && <Button {...profileEditButton} />}
          </Column>
        </Row>
      )}
    </>
  );
};
