import { getUser } from "@/modules/auth/client";
import { tryGet } from "@/modules/common/utils";
import { ILandingPageView } from "@/modules/landingPage/types/ILandingPageView";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { Button, FormLabel } from "carbon-components-react";
import { ButtonContainer } from "@/modules/common/components";

export const LandingPageView = ({ content }: { content: ILandingPageView }) => {
  const [user] = getUser();
  return (
    <SimplePageView
      url="/Pregnancy_pink80.svg"
      alt="Beschreibung des Bildes"
      content={content}>
      <ButtonContainer>
        {user
          ? content.linksIfLoggedIn.map(link => (
              <div>
                <FormLabel>
                  {tryGet(link.key, content.elements)?.help}
                </FormLabel>
                <Button href={link.route}>{link.label}</Button>
              </div>
            ))
          : content.links.map(link => (
              <div>
                <FormLabel>
                  {tryGet(link.key, content.elements)?.help}
                </FormLabel>
                <Button href={link.route}>{link.label}</Button>
              </div>
            ))}
      </ButtonContainer>
    </SimplePageView>
  );
};
