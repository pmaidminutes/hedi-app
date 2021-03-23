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

export const LandingPageView = ({ content }: { content: ILandingPageView }) => {
  return (
    <SimplePageView content={content}>
      <Row>
        {content.links.map(link => (
          <Column>
            <ButtonSet stacked>
              <FormLabel>{tryGet(link.key, content.elements)?.help}</FormLabel>
              <Button href={link.route}>{link.label}</Button>
            </ButtonSet>
          </Column>
        ))}
      </Row>
    </SimplePageView>
  );
};
