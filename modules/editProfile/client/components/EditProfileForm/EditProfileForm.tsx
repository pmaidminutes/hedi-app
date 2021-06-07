import {
  Form,
  Button,
  FormGroup,
  Column,
  Row,
  TextInput,
  Toggle,
  InlineNotification,
  FormProps,
  InlineLoading,
  TextArea,
  ContentSwitcher,
  Switch,
  SelectableTile,
  ToastNotification,
} from "carbon-components-react";
import { getTextInputProps } from "@/modules/common/utils";
import { Seperator } from "@/modules/common/components";
import {
  IConsultationHoursEntry,
  IEditProfileFormConfig,
  IUpsertProfileResponse,
  orderedRequiredFields,
} from "../../../types";
import { ServiceSelection } from "../ServiceSelection";
import { useValidationErrors } from "./hooks";
import { TextInputProps } from "carbon-components-react";
import { ConsultationHoursSelection } from "../ConsultationHours";
import { days, timeRanges } from "../ConsultationHours/ConfigConsultationHours";
import React, { ChangeEvent, useRef, RefObject } from "react";
import {
  minLengthValidationFn,
  requiredValidationFn,
  ValidatedTextInput,
  useValidationSummary,
  ValidationSummary,
} from "@/modules/react/validation";

type EditProfileInputProps = FormProps & {
  config: IEditProfileFormConfig;
  data: IUpsertProfileResponse;
  isValidating?: boolean;
  isSuccessfullySaved?: boolean;
};
const getRequiredTextInputProps = (
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  identifier: string,
  elements?: any[]
): Pick<TextInputProps, "id" | "labelText" | "placeholder" | "aria-label"> & {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} => {
  // HACK removed helperText to not be shown always and to show it just in validation error cases
  const { helperText, labelText, ...rest } = getTextInputProps(identifier);

  return { labelText: <strong>{labelText}*</strong>, ...rest, onChange };
};

type RefMap = Record<string, RefObject<HTMLInputElement>>;

export const EditProfileForm = ({
  config: { languageOptions },
  data: { success, errors, profile },
  isValidating,
  isSuccessfullySaved,
  ...formProps
}: EditProfileInputProps) => {
  const getError = (key: string) => errors?.[key] ?? validationErrors?.[key];
  const hasError = () =>
    (errors && Object.keys(errors).length != 0) ||
    Object.keys(validationErrors).length != 0;

  const refs: RefMap = orderedRequiredFields
    .map(field => ({
      field: field,
      ref: useRef<HTMLInputElement>(null),
    }))
    .reduce((result, item) => {
      result[item.field] = item.ref;
      return result;
    }, {} as RefMap);

  const { onSubmit, ...formPropsRest } = formProps;
  const {
    validationErrors,
    handleRequiredFieldChange,
    handleSubmit,
  } = useValidationErrors([], refs, onSubmit);

  const {
    validationErrors: validationErrorsForSummary,
    setValidationError,
  } = useValidationSummary();
  return (
    <Form {...formPropsRest} onSubmit={handleSubmit}>
      {errors?.generic && (
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={errors.generic}
        />
      )}

      <Row>
        <div className="hedi--group hedi--group--profile-type">
          <FormGroup legendText={<h2>Tätigkeitsbereich</h2>}></FormGroup>
        </div>
      </Row>

      <div className="hedi--group hedi--group--name">
        <FormGroup legendText={<h2>Name</h2>}>
          <Row>
            <Column lg={2} md={2}>
              <TextInput
                id="prefix"
                labelText="prefix"
                name="prefix"
                invalid={!!errors?.prefix}
                invalidText={errors?.prefix}
                defaultValue={profile?.prefix}
              />
            </Column>
            <Column lg={6} md={6}>
              <ValidatedTextInput
                id="forename"
                labelText="forename"
                name="forename"
                invalid={typeof getError("forename") === "string"}
                invalidText={getError("forename")}
                defaultValue={profile?.forename}
                ref={refs.forename}
                validateFn={minLengthValidationFn(5)}
                enableValidation
                onValidation={texterror =>
                  setValidationError("forename", texterror)
                }
              />
            </Column>
          </Row>
          <Row>
            <Column lg={6} md={6}>
              <ValidatedTextInput
                id="surname"
                labelText="surname"
                name="surname"
                invalid={typeof getError("surname") === "string"}
                invalidText={getError("surname")}
                defaultValue={profile?.surname}
                ref={refs.surname}
                validateFn={minLengthValidationFn(3)}
                enableValidation
                onValidation={texterror =>
                  setValidationError("surname", texterror)
                }
              />
            </Column>
          </Row>
        </FormGroup>
      </div>

      <Seperator />

      <div className="hedi--group hedi--group--address">
        <FormGroup legendText="Adresse">
          <Row>
            <Column lg={6} md={6}>
              <ValidatedTextInput
                id="city"
                labelText="city"
                name="city"
                invalid={typeof getError("city") === "string"}
                invalidText={getError("city")}
                enableValidation
                defaultValue={profile?.city}
                ref={refs.city}
                validateFn={requiredValidationFn()}
                onValidation={texterror =>
                  setValidationError("city", texterror)
                }
              />
            </Column>
            <Column lg={2} md={2}>
              <TextInput
                id="postal_code"
                labelText="postal_code"
                name="postal_code"
                invalid={!!errors?.postal_code}
                invalidText={errors?.postal_code}
                defaultValue={profile?.postal_code}
              />
            </Column>
          </Row>
          <Row>
            <Column lg={6} md={6}>
              <TextInput
                id="street"
                labelText="street"
                name="street"
                invalid={!!errors?.street}
                invalidText={errors?.street}
                defaultValue={profile?.street}
              />
            </Column>
            <Column lg={2} md={2}>
              <TextInput
                id="house_number"
                labelText="house_number"
                name="house_number"
                invalid={!!errors?.house_number}
                invalidText={errors?.house_number}
                defaultValue={profile?.house_number}
              />
            </Column>
          </Row>
        </FormGroup>
      </div>
      <Seperator />

      <div className="hedi--group hedi--group--contact">
        <FormGroup legendText={<h2>Kontakt</h2>}>
          <Row>
            <Column lg={6} md={6}>
              <ValidatedTextInput
                id="phone"
                labelText="phone"
                name="phone"
                invalid={typeof getError("phone") === "string"}
                invalidText={getError("phone")}
                defaultValue={profile?.phone}
                ref={refs.phone}
                validateFn={requiredValidationFn()}
                enableValidation
                onValidation={texterror =>
                  setValidationError("phone", texterror)
                }
              />
            </Column>
          </Row>
          <Row>
            <Column lg={6} md={6}>
              <ValidatedTextInput
                id="mail"
                labelText="mail"
                name="mail"
                invalid={typeof getError("mail") === "string"}
                invalidText={getError("mail")}
                defaultValue={profile?.mail}
                ref={refs.mail}
                validateFn={requiredValidationFn()}
                enableValidation
                onValidation={texterror =>
                  setValidationError("mail", texterror)
                }
              />
            </Column>
          </Row>
        </FormGroup>
      </div>
      <Seperator />

      <div className="hedi--group hedi--group--consultation-hours">
        <FormGroup legendText={<h2>consultation_hours</h2>}>
          <Row>
            {/* <ConsultationHoursSelection
              config={{
                elements,
                consultationDays: days,
                consultationTimeStart: timeRanges,
                consultationTimeEnd: timeRanges,
              }}
              data={profile?.consultationHours}
            /> */}
          </Row>
        </FormGroup>
      </div>

      <Seperator />

      <div className="hedi--group hedi--group--language-skills">
        <FormGroup legendText={<h2>Sprachen</h2>}>
          <Row>
            {/* <LanguageSkillsSelection
              config={{
                elements,
                languageLevelElements,
                languageOptions,
              }}
              data={profile?.languageSkills}
            /> */}
          </Row>
        </FormGroup>
      </div>

      <div className="hedi--group hedi--group--services">
        <FormGroup legendText={<h2>Angebote</h2>}>
          <Row>
            <Column lg={8}>
              {/* <ServiceSelection
                      config={{ elements, serviceGroup }}
                      data={profile?.services}
                    /> */}
            </Column>
          </Row>
        </FormGroup>
      </div>

      <Row>
        <Column lg={8} md={8}>
          {isValidating ? (
            <InlineLoading status="active" />
          ) : isSuccessfullySaved ? (
            <ToastNotification
              title={"Success"}
              subtitle={"success_message"}
              caption={<InlineLoading status="active" />}
              kind="success"
              lowContrast
              hideCloseButton
              style={{ width: "100%" }}
            />
          ) : hasError() ? (
            <ToastNotification
              title={"Error"}
              subtitle={"error_message"}
              caption=""
              kind="error"
              lowContrast
              hideCloseButton
              style={{ width: "100%" }}
            />
          ) : (
            <Button type="submit">Profil speichern</Button>
          )}
        </Column>

        <ValidationSummary validationErrors={validationErrorsForSummary} />
      </Row>
    </Form>
  );
};
