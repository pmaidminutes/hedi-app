import { ITyped } from "@/modules/model";
import { ILandingPageView } from "../../types/ILandingPageView";
import { LandingPageView } from "./LandingPageView/LandingPageView";

export const TryLandingPage = (content: ITyped): JSX.Element | null =>
  content.type === "LandingPage" ? (
    <LandingPageView content={content as ILandingPageView} />
  ) : null;
