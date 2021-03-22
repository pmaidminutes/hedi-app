import { useTextInput } from "@/modules/react/hooks";
import { HTMLWithNextImage } from "@/modules/react/html";
import { Column, Grid, Row } from "carbon-components-react";
import Image from "next/image";
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
      <Image
        {...content.posterImage}
        src={"http://appstaging.projekt-hedi.de" + content.posterImage?.route}
      />
      <Grid>
        <Row>
          <h2>{content.longTitle ?? content.label}</h2>
        </Row>
        <Row>
          <HTMLWithNextImage data={content.body} />
        </Row>
        <Column>
          <Row></Row>
        </Column>
        <Column>
          <Row>
            <RegisterForm elements={content.elements} eagerValidate={true} />
          </Row>
        </Column>
        <Column>
          <Row>
            <button onClick={() => router.back()}>
              {content.elements.find(e => e.identifier === "back")?.value}
            </button>
          </Row>
        </Column>
      </Grid>
    </>
  );
};
