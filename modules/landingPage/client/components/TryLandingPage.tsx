import { ITyped } from "@/modules/model";
import { IPage } from "@/modules/page/types";
import { LandingPageView } from ".";

export const TryLandingPage = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "LandingPage" ? (
    <LandingPageView content={content as IPage} />
  ) : null;
