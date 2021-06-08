import { getUser } from "@/modules/auth/client";
import { ILandingPageView } from "@/modules/landingPage/types/ILandingPageView";
import { Button, FormLabel, Row, Column } from "carbon-components-react";
import { transformLandingPage } from "./transformLandingPage";

export const LandingPageView = ({ content }: { content: ILandingPageView }) => {
  const [user] = getUser();
  const { links, linksIfLoggedIn, isLastElement } = transformLandingPage(
    content
  );
  return (
    <Row>
      {user
        ? linksIfLoggedIn.map(link => (
            <Column key={link.route}>
              <div>
                <FormLabel>Hier war mal ein UI Element</FormLabel>
              </div>
              <Button href={link.route}>{link.longTitle}</Button>
            </Column>
          ))
        : links.map((link, index) => (
            <Column
              key={index}
              lg={
                isLastElement(index + 1, links)
                  ? { span: 5, offset: 1 }
                  : { span: 5 }
              }
              md={4}
              sm={2}>
              <div key={link.label + index}>
                <FormLabel>Hier war auch ein UI Element</FormLabel>
              </div>
              <Button
                kind={isLastElement(index + 1, links) ? "secondary" : "primary"}
                href={link.route}>
                {link.label}
              </Button>
            </Column>
          ))}
    </Row>
  );
};
