import { ITyped } from "@/modules/model";
import { IPage } from "@/modules/page/types";
import { ProfileTestLandingPageView } from ".";

export const TryProfileTestLandingPage = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "ProfileTestLandingPage" ? (
    <ProfileTestLandingPageView content={content as IPage} />
  ) : null;
