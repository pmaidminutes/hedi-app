import { SimpleAppPageView } from "@/modules/common/components/AppPage";
import { ILandingPageView } from "@/modules/landingPage/types/ILandingPageView";
import { Button } from "carbon-components-react";
import Link from "next/link";

export const LandingPageView = ({ content }: { content: ILandingPageView }) => {
  return (
    <SimpleAppPageView content={content} rootCssClass="landing-page">
      {content.links.map(appPage => (
        <span className="landing-page-button-group">
          <span className="help-text">
            {
              content.elements?.find(
                element => element.identifier == appPage.key
              )?.help
            }
          </span>
          <Link key={appPage.key} href={appPage.route} passHref>
            <a href={appPage.route}>
              <Button>{appPage.label}</Button>
            </a>
          </Link>
        </span>
      ))}
    </SimpleAppPageView>
  );
};
