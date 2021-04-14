import Link from "next/link";
import { Button, Column, Row, Loading } from "carbon-components-react";

import { ITyped } from "@/modules/model";

import { IViewProfileView } from "../../../types";
import { getEditProfileLink } from "./getEditProfileLink";
import { useViewProfile } from "./useViewProfile";

export const TryViewProfile = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "ViewProfile" ? (
    <ViewProfileView content={content as IViewProfileView} />
  ) : null;

export const ViewProfileView = ({ content }: { content: IViewProfileView }) => {
  const { currentProfileIsLoading } = useViewProfile(content.lang);
  const editProfile = getEditProfileLink(content);
  return (
    <>
      {currentProfileIsLoading ? (
        <Loading />
      ) : (
        <Row>
          <Column>
            <Link href={editProfile.route} passHref>
              <Button>{editProfile.label}</Button>
            </Link>
          </Column>
        </Row>
      )}
    </>
  );
};
