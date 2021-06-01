import React from "react";
import { ILogin, transformLogin } from "./transformLogin";
import {
  TextInput,
  Button,
  InlineNotification,

} from "@/modules/components";
import { ButtonHintLink } from "@/modules/common/components";
import { Column, Form, Row } from "carbon-components-react";
import { ArrowLeft16 } from "@carbon/icons-react";

export const Login = ({ content }: { content: ILogin }) => {
  const {
    username,
    password,
    success,
    invalid,
    submit,
    register,
    back,
    hint,
  } = transformLogin(content);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit");
  };

  return (
    <>
      <Row>
        <Column>
          <Form onSubmit={handleSubmit}>
            {username && <TextInput {...username} />}
            {password && <TextInput {...password} />}
            {invalid && <InlineNotification {...invalid} />}
            {success && <InlineNotification {...success} />}
            <div className="hedi--login-buttoncontainer">
              {submit && register && hint && (
                <ButtonHintLink button={submit} link={register} hint={hint} />
              )}
            </div>
          </Form>
        </Column>
      </Row>
      <Row>
        <Column>{back && <Button renderIcon={ArrowLeft16} {...back} />}</Column>
      </Row>
    </>
  );
};
