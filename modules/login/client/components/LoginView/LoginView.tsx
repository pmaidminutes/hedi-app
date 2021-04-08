import { Button, Column, FormLabel, Row } from "carbon-components-react";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { ArrowLeft16 } from "@carbon/icons-react";
import { hasElement, tryGet } from "@/modules/common/utils";

import { useLoginView } from "./useLoginView";
import { LoginForm } from "../LoginForm";
import { ILoginView } from "../../../types";

export const LoginView = ({ content }: { content: ILoginView }) => {
  const { backButtonProps, redirectUrl } = useLoginView(content);

  return (
    <SimplePageView
      content={content}
      url={process.env.NEXT_PUBLIC_IMG_HEADER}
      alt="Beschreibung des Bildes"
      customKey="login-form"
      rightColumnProps={{ md: 4, lg: 6, xlg: 6 }}>
      <Row>
        <Column>
          <LoginForm {...content} redirectUrl={redirectUrl} />
        </Column>
      </Row>
      <Row>
        {content.links.map((link, index) => {
          if (link.key !== "registration") {
            return (
              <Column key={link.key + index}>
                <FormLabel className="hedi--block-label">
                  {tryGet(link.key, content.elements)?.help}
                </FormLabel>
                {hasElement(link.key, content.elements) && (
                  <Button href={link.route}>{link.label}</Button>
                )}
              </Column>
            );
          }
        })}
      </Row>
      <Row>
        <Column>
          <Button kind="ghost" renderIcon={ArrowLeft16} {...backButtonProps} />
        </Column>
      </Row>
    </SimplePageView>
  );
};
