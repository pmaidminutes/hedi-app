import Link from "next/link";
import { Button, Column, Row, Loading } from "carbon-components-react";

import { ITyped } from "@/modules/model";
import { SimplePageView } from "@/modules/simplePage/client/components";

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
    <SimplePageView
      url={process.env.NEXT_PUBLIC_IMG_HEADER_PROFILE}
      alt="Beschreibung des Bildes"
      content={content}
      rightColumnProps={{ md: 4, lg: 6, xlg: 6 }}>
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
    </SimplePageView>
  );
};
