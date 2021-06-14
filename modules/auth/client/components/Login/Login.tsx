import React, { SyntheticEvent } from "react";
import { transformLogin } from "./transformLogin";
import { ILogin } from "../../../types";
import { useLogin } from "./useLogin";
import {
  Button,
  InlineNotification,
  ValidatedTextInput,
} from "@/modules/components";
import { ButtonHintLink } from "@/modules/common/components";
import { Column, Form, Row, Loading } from "carbon-components-react";
import { ArrowLeft16 } from "@carbon/icons-react";

import {
  requiredValidationFn,
  minLengthValidationFn,
  ValidationSummary,
} from "@/modules/react/validation";
import { useValidationSummary } from "@/modules/react/hooks/useValidationSummary";

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
  const { validationErrors, setValidationError } = useValidationSummary();
  return !isLoading ? (
    <>
      <Row>
        <Column>
          <Form onSubmit={(e: any) => handleLogin(e)}>
            {username && !isLoggedIn && (
              <ValidatedTextInput
                validateFn={[requiredValidationFn()]}
                enableValidation
                onValidation={texterror =>
                  setValidationError("username", texterror)
                }
                {...username}
              />
            )}
            {password && !isLoggedIn && (
              <ValidatedTextInput
                validateFn={[minLengthValidationFn(3), requiredValidationFn()]}
                enableValidation
                onValidation={texterror =>
                  setValidationError("password", texterror)
                }
                {...password}
              />
            )}
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

        <ValidationSummary validationErrors={validationErrors} />
      </Row>
    </>
  ) : (
    <Loading />
  );
};
