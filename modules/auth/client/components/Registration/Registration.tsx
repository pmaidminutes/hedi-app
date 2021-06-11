import { IRegistration } from "../../../types";
import React, { SyntheticEvent } from "react";
import { transformRegistration } from "./transformRegistration";
import { ArrowLeft16 } from "@carbon/icons-react";
import { Column, Row, Form, Loading } from "carbon-components-react";
import {
  Button,
  InlineNotification,
  Body,
  ValidatedTextInput,
} from "@/modules/components";
import { useRegistration } from "./useRegistration";
import {
  useValidationSummary,
  ValidationSummary,
} from "@/modules/validation/client";
export const Registration = ({ content }: { content: IRegistration }) => {
  const {
    username,
    password,
    back,
    submit,
    invalidText,
    success,
    error,
    redirectUrl,
    text,
    code,
  } = transformRegistration(content);
  const {
    handleBackButtonClick,
    handleSubmit,
    isCheckRegisterCodeError,
    registrationcode,
    setRegistrationcode,
    setName,
    setPass,
    hasRegistrationCodeError,
    isLoading,
    isCheckCredentialError,
    isSuccess,
    hasPasswordError,
    hasUsernameError,
  } = useRegistration(redirectUrl);

  const { validationErrors, setValidationError } = useValidationSummary();

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Row>
        <Column>{text && <Body {...text} />}</Column>
      </Row>
      <Row>
        <Column>
          <Form onSubmit={handleSubmit}>
            {isCheckRegisterCodeError && error && !isSuccess && (
              <InlineNotification {...error} lowContrast={true} />
            )}
            {isSuccess && success && (
              <InlineNotification {...success} lowContrast={true} />
            )}
            {code && (
              <ValidatedTextInput
                {...code}
                onChange={setRegistrationcode}
                invalidText={invalidText}
                invalid={isCheckRegisterCodeError && hasRegistrationCodeError}
                onValidation={texterror =>
                  setValidationError("code", texterror)
                }
              />
            )}

            {!!registrationcode && username && (
              <ValidatedTextInput
                {...username}
                onChange={setName}
                invalid={isCheckCredentialError && hasUsernameError}
                onValidation={texterror =>
                  setValidationError("username", texterror)
                }
              />
            )}
            {!!registrationcode && password && (
              <ValidatedTextInput
                {...password}
                onChange={setPass}
                invalid={isCheckCredentialError && hasPasswordError}
                onValidation={texterror =>
                  setValidationError("password", texterror)
                }
              />
            )}

            {!!registrationcode && submit && (
              <Button {...submit} size="field" />
            )}
          </Form>

          {back && (
            <Button
              onClick={(e: SyntheticEvent) => handleBackButtonClick(e)}
              renderIcon={ArrowLeft16}
              {...back}
            />
          )}
        </Column>
      </Row>
      <Row>
        <ValidationSummary validationErrors={validationErrors} />
      </Row>
    </>
  );
};
