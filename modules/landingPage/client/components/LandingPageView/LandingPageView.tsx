import { AppPageView } from "@/modules/common/components/AppPage";
import { ILandingPageView } from "@/modules/landingPage/types/ILandingPageView";
import Link from "next/link";

export const LandingPageView = ({ content }: { content: ILandingPageView }) => {
  return (
    <AppPageView content={content} rootCssClass="landing-page">
      {content.buttons.map(appPage => (
        <Link key={appPage.key} href={appPage.route} passHref>
          <a href={appPage.route}>{appPage.label}</a>
        </Link>
      ))}
    </AppPageView>
  );
};
