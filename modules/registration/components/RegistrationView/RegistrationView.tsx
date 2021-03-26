import { tryGetRedirect, tryGetValue } from "@/modules/common/utils";
import { useLoginView } from "@/modules/login/hooks";
import { useTextInput } from "@/modules/react/hooks";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { SkipBack20, ArrowLeft16 } from "@carbon/icons-react";
import { Button, Column, Row } from "carbon-components-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IRegisterError, IRegisterInfo } from "../../types";
import { IRegistrationView } from "../../types/IRegistrationView";
import { RegisterForm } from "../RegisterForm";

type RegisterInputProps = {
  errors?: IRegisterError;
  onChange?: (info: IRegisterInfo) => void;
  content: IRegistrationView;
};

export const RegistrationView = ({
  errors,
  onChange,
  content,
}: RegisterInputProps) => {
  const [name, setName] = useTextInput();
  //const [mail, setMail] = useTextInput();
  const [pass, setPass] = useTextInput();
  const router = useRouter();
  useLoginView(tryGetRedirect("redirect", content.elements, content.links));
  useEffect(() => {
    if (onChange && (name || pass)) {
      onChange({ name, pass });
    }
  }, [name, pass]);
  return (
    <SimplePageView
      url="/Pregnancy_pink80.svg"
      alt="Beschreibung des Bildes"
      content={content}
      rightColumnProps={{ md: 4, lg: 6, xlg: 6 }}>
      <Row>
        <Column>
          <RegisterForm
            elements={content.elements}
            redirect={tryGetRedirect(
              "success",
              content.elements,
              content.links
            )}
          />
          <Button
            tooltip={tryGetValue("back", content.elements)}
            renderIcon={ArrowLeft16}
            kind="ghost"
            onClick={() => router.back()}>
            {tryGetValue("back", content.elements)}
          </Button>
        </Column>
      </Row>
    </SimplePageView>
  );
};
