import { tryGetValue } from "@/modules/common/utils";
import { useTextInput } from "@/modules/react/hooks";
import { HTMLWithNextImage } from "@/modules/react/html";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { Column, Grid, Row } from "carbon-components-react";
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
  const backLink = () => router.back();
  useEffect(() => {
    if (onChange && (name || pass)) {
      onChange({ name, pass });
    }
  }, [name, pass]);
  return (
    <>
      <SimplePageView content={content}></SimplePageView>

      <HTMLWithNextImage data={tryGetValue("body", content.elements, "")} />
      <Grid>
        <Column>
          <Row>
            {
              //TODO image to the left should be added
            }
          </Row>
        </Column>
        <Column>
          <Row>
            <RegisterForm elements={content.elements} />
          </Row>
          <Row>
            <button onClick={() => router.back()}>
              {tryGetValue("back", content.elements)}
            </button>
          </Row>
        </Column>
      </Grid>
    </>
  );
};
