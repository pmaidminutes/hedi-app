import { ILogin } from "@/modules/login/client";
import React, { SyntheticEvent } from "react";
import { transformRegistration } from "./transformRegistration";
import { ArrowLeft16 } from "@carbon/icons-react";
import { Column, Row, Form, Loading } from "carbon-components-react";
import {
  Button,
  InlineNotification,
  TextInput,
  Body,
} from "@/modules/components";
import {
  ValidatedTextInput,
  ValidationSummary,
} from "@/modules/react/validation";
import { useRegistration } from "./useRegistration";
export const Registration = ({ content }: { content: ILogin }) => {
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
    validationErrors,
    setValidationError,
    requiredValidationFn,
  } = useRegistration(redirectUrl);
  console.log({ content });

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
            {isCheckRegisterCodeError && error && (
              <InlineNotification {...error} lowContrast={true} />
            )}
            {isSuccess && success && (
              <InlineNotification {...success} lowContrast={true} />
            )}
            {code && (
              <TextInput
                {...code}
                onChange={setRegistrationcode}
                invalidText={invalidText}
                invalid={isCheckRegisterCodeError && hasRegistrationCodeError}
              />
            )}

            {!!registrationcode && username && (
              <ValidatedTextInput
                {...username}
                onChange={setName}
                invalid={isCheckCredentialError && hasUsernameError}
                validateFn={requiredValidationFn()}
              />
            )}
            {!!registrationcode && password && (
              <ValidatedTextInput
                {...password}
                onChange={setPass}
                invalid={isCheckCredentialError && hasPasswordError}
                validateFn={requiredValidationFn()}
              />
            )}
            <ValidationSummary validationErrors={validationErrors} />
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
    </>
  );
};
