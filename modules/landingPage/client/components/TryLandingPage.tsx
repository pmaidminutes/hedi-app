import { ITyped } from "@/modules/model";

export const TryLandingPage = (content: ITyped): JSX.Element | null =>
  content.type === "LandingPage" ? (
    // <LandingPageView content={content as ILandingPageView} key={content.type} />
    <div>testing</div>
  ) : null;
