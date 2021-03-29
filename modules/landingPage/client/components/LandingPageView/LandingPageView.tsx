import { getUser } from "@/modules/auth/client";
import { tryGet } from "@/modules/common/utils";
import { ILandingPageView } from "@/modules/landingPage/types/ILandingPageView";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { Button, FormLabel, Row, Column } from "carbon-components-react";
import { useLandingPage } from "./useLandingPage";

export const LandingPageView = ({ content }: { content: ILandingPageView }) => {
  const [user] = getUser();
  const { links, linksIfLoggedIn, isLastElement } = useLandingPage(content);
  return (
    <SimplePageView
      url="/images/Pregnancy_blue.svg"
      alt="Beschreibung des Bildes"
      content={content}>
      <Row>
        {user
          ? linksIfLoggedIn.map(link => (
              <Column>
                <div>
                  <FormLabel>
                    {tryGet(link.key, content.elements)?.help}
                  </FormLabel>
                </div>
                <Button href={link.route}>{link.label}</Button>
              </Column>
            ))
          : links.map((link, index) => (
              <Column
                lg={
                  isLastElement(index + 1, links)
                    ? { span: 5, offset: 1 }
                    : { span: 5 }
                }
                md={4}
                sm={2}>
                <div key={link.label + index}>
                  <FormLabel>
                    {tryGet(link.key, content.elements)?.help}
                  </FormLabel>
                </div>
                <Button
                  kind={
                    isLastElement(index + 1, links) ? "secondary" : "primary"
                  }
                  href={link.route}>
                  {link.label}
                </Button>
              </Column>
            ))}
      </Row>
    </SimplePageView>
  );
};
