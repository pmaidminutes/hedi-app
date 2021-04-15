import {
  getUIElementRedirectRoute,
  getUIElementValue,
} from "@/modules/common/utils";
import { useAuthorizedRedirect } from "@/modules/react/hooks";
import { ArrowLeft16 } from "@carbon/icons-react";
import { Button, Column, Row } from "carbon-components-react";
import { useRouter } from "next/router";
import { IRegisterError, IRegisterInfo } from "../../../types";
import { IRegistrationView } from "../../../types/IRegistrationView";
import { RegisterForm } from "../RegisterForm";

type RegisterInputProps = {
  errors?: IRegisterError;
  onChange?: (info: IRegisterInfo) => void;
  content: IRegistrationView;
};

export const RegistrationView = ({ content }: RegisterInputProps) => {
  const router = useRouter();
  useAuthorizedRedirect(
    getUIElementRedirectRoute("redirect", content.elements, content.links)
  );

  return (
    <Row>
      <Column>
        <RegisterForm
          elements={content.elements}
          redirect={getUIElementRedirectRoute(
            "success",
            content.elements,
            content.links
          )}
        />
        <Button
          tooltip={getUIElementValue("back", content.elements)}
          renderIcon={ArrowLeft16}
          kind="ghost"
          onClick={() => router.back()}>
          {getUIElementValue("back", content.elements)}
        </Button>
      </Column>
    </Row>
  );
};
