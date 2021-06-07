import Link from "next/link";
import { Column, Row, Loading } from "carbon-components-react";

import { ITyped } from "@/modules/model";
import { IPage } from "@/modules/page/types";

import { useProfilePreview } from "./useProfilePreview";
import {
  findButtonInstance,
  findLinkInstance,
} from "@/modules/model/components";
import { Button } from "@/modules/components";

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
  const profileEditLink = findLinkInstance(
    content.components,
    "profileEditLink"
  );
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
            {profileEditButton && (
              <Link href={profileEditLink?.href ?? "#"} passHref>
                <Button {...profileEditButton} />
              </Link>
            )}
          </Column>
        </Row>
      )}
    </>
  );
};
