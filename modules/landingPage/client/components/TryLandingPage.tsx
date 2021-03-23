import { ITyped } from "@/modules/model";
import { LandingPageView } from ".";
import { ILandingPageView } from "../../types/ILandingPageView";

export const TryLandingPage = (content: ITyped): JSX.Element | null =>
  content.type === "LandingPage" ? (
    <LandingPageView content={content as ILandingPageView} />
  ) : null;
