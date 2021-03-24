import { tryGet } from "@/modules/common/utils";
import { ILandingPageView } from "@/modules/landingPage/types/ILandingPageView";
import { SimplePageView } from "@/modules/simplePage/client/components";
import {
  Button,
  ButtonSet,
  Column,
  FormLabel,
  Row,
} from "carbon-components-react";
import { ButtonContainer } from "@/modules/common/components";

export const LandingPageView = ({ content }: { content: ILandingPageView }) => {
  return (
    <SimplePageView
      url="/Pregnancy_pink80.svg"
      alt="Beschreibung des Bildes"
      content={content}>
      <ButtonContainer>
        {content.links.map(link => (
          <div>
            <FormLabel>{tryGet(link.key, content.elements)?.help}</FormLabel>
            <Button href={link.route}>{link.label}</Button>
          </div>
        ))}
      </ButtonContainer>
    </SimplePageView>
  );
};
