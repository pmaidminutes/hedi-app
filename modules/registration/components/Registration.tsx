import { IsIHTTPError } from "@/modules/common/error";
import { getTextInputProps } from "@/modules/common/utils";
import { useTextInput } from "@/modules/react/hooks";
import { HTMLWithNextImage } from "@/modules/react/html";
import { AspectRatio, Grid, Row, TextInput } from "carbon-components-react";
import { useEffect } from "react";
import { useValidate } from "../request/useValidate";
import { IRegisterError, IRegisterInfo } from "../types";
import { IRegistrationView } from "../types/IRegistrationView";
import { RegisterForm } from "./RegisterForm";

type RegisterInputProps = {
  errors?: IRegisterError;
  onChange?: (info: IRegisterInfo) => void;
  content: IRegistrationView;
};

export const Registration = ({
  errors,
  onChange,
  content,
}: RegisterInputProps) => {
  const [passcode, setPasscode] = useTextInput();
  const [name, setName] = useTextInput();
  const [mail, setMail] = useTextInput();
  const [pass, setPass] = useTextInput();
  useEffect(() => {
    if (onChange && (name || mail || pass)) {
      onChange({ name, mail, pass });
    }
  }, [name, mail, pass]);

  const { data, error } = useValidate({ passcode: passcode });

  return (
    <>
      <AspectRatio ratio="2x1">
        <img
          {...content.posterImage}
          src={
            "http://cms.projekt-hedi.de/sites/default/files" +
            content.posterImage?.route
          }
        />
      </AspectRatio>
      <Grid>
        <Row></Row>
        <Row>
          <h2>
            <HTMLWithNextImage data={content.longTitle ?? ""} />
          </h2>
        </Row>
        <Row>
          <TextInput
            {...getTextInputProps("passcode", content.elements)}
            required
            onChange={setPasscode}
            invalid={!!errors?.passcode}
            invalidText={errors?.passcode}
          />
        </Row>

        <Row>
          {!IsIHTTPError(data) && data?.success ? (
            <>
              <RegisterForm elements={content.elements} eagerValidate={true} />
            </>
          ) : (
            ""
          )}
        </Row>
      </Grid>
    </>
  );
};
