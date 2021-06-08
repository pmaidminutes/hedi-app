import React, { SyntheticEvent } from "react";
import { transformLogin } from "./transformLogin";
import { ILogin } from "../../../types";
import { useLogin } from "./useLogin";
import { TextInput, Button, InlineNotification } from "@/modules/components";
import { ButtonHintLink } from "@/modules/common/components";
import { Column, Form, Row, Loading } from "carbon-components-react";
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
    redirectUrl,
  } = transformLogin(content);

  const {
    handleBackButtonClick,
    handleLogin,
    isLoading,
    hasError,
    isSuccess,
    isLoggedIn,
  } = useLogin(redirectUrl);

  return !isLoading ? (
    <>
      <Row>
        <Column>
          <Form onSubmit={(e: any) => handleLogin(e)}>
            {username && !isLoggedIn && <TextInput {...username} />}
            {password && !isLoggedIn && <TextInput {...password} />}
            {invalid && hasError && <InlineNotification {...invalid} />}
            {success && isSuccess && <InlineNotification {...success} />}
            {!isLoggedIn ? (
              <div className="hedi--login-buttoncontainer">
                {submit && register && hint && !isLoading && (
                  <ButtonHintLink button={submit} link={register} hint={hint} />
                )}
              </div>
            ) : null}
          </Form>
        </Column>
      </Row>
      <Row>
        <Column>
          {back && (
            <Button
              onClick={(e: SyntheticEvent) => handleBackButtonClick(e)}
              renderIcon={ArrowLeft16}
              {...back}
            />
          )}
        </Column>
      </Row>
    </>
  ) : (
    <Loading />
  );
};
