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
import {
  getTextInputProps,
  hasElement,
  getUIElement,
  getUIElementValue,
} from "@/modules/common/utils";
import { Seperator } from "@/modules/common/components";
import {
  IConsultationHoursEntry,
  IEditProfileFormConfig,
  IUpsertProfile,
  orderedRequiredFields,
} from "../../../types";
import { ServiceSelection } from "../ServiceSelection";
import { useProfileTypeSwitch, useValidationErrors } from "./hooks";
import { LanguageSkillsSelection } from "../LanguageSkillsSelection";
import { IUIElementTexts } from "@/modules/model";
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
  data: IUpsertProfile;
  isValidating?: boolean;
  isSuccessfullySaved?: boolean;
};
const getRequiredTextInputProps = (
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  identifier: string,
  elements?: IUIElementTexts[]
): Pick<TextInputProps, "id" | "labelText" | "placeholder" | "aria-label"> & {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} => {
  // HACK removed helperText to not be shown always and to show it just in validation error cases
  const { helperText, labelText, ...rest } = getTextInputProps(
    identifier,
    elements
  );

  return { labelText: <strong>{labelText}*</strong>, ...rest, onChange };
};

type RefMap = Record<string, RefObject<HTMLInputElement>>;

export const EditProfileForm = ({
  config: {
    elements,
    languageLevelElements,
    conditionalElements,
    domainOptions,
    languageOptions,
    conditionalServiceGroups,
  },
  data: { success, errors, profile },
  isValidating,
  isSuccessfullySaved,
  ...formProps
}: EditProfileInputProps) => {
  const { profileType, handleContentSwitcherChange } = useProfileTypeSwitch(
    profile?.type
  );
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
  } = useValidationErrors(elements, refs, onSubmit);

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

      <input id="type" name="type" value={profileType} hidden={true} readOnly />

      <Row>
        <div className="hedi--group hedi--group--profile-type">
          <FormGroup
            legendText={
              <h2>
                {getUIElementValue("group-type", elements, "Tätigkeitsbereich")}
              </h2>
            }>
            <ContentSwitcher
              onChange={handleContentSwitcherChange}
              size="xl"
              selectedIndex={profileType === "Midwife" ? 0 : 1}>
              <Switch
                name="Midwife"
                text={getUIElementValue("type-midwife", elements, "Hebamme")}
                onClick={() => {}}
                onKeyDown={() => {}}
                defaultChecked={profileType === "Midwife"}
              />
              <Switch
                name="Caregiver"
                text={getUIElementValue(
                  "type-caregiver",
                  elements,
                  "Betreuende"
                )}
                onClick={() => {}}
                onKeyDown={() => {}}
                defaultChecked={profileType === "Caregiver"}
              />
            </ContentSwitcher>
          </FormGroup>
        </div>
      </Row>

      <div className="hedi--group hedi--group--name">
        <FormGroup
          legendText={
            <h2>{getUIElementValue("group-name", elements, "Name")}</h2>
          }>
          <Row>
            <Column lg={2} md={2}>
              <TextInput
                {...getTextInputProps("prefix", elements)}
                name="prefix"
                invalid={!!errors?.prefix}
                invalidText={errors?.prefix}
                defaultValue={profile?.prefix}
              />
            </Column>
            <Column lg={6} md={6}>
              <ValidatedTextInput
                {...getRequiredTextInputProps(
                  handleRequiredFieldChange,
                  "forename",
                  elements
                )}
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
                {...getRequiredTextInputProps(
                  handleRequiredFieldChange,
                  "surname",
                  elements
                )}
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
        <FormGroup
          legendText={
            <h2>{getUIElementValue("group-address", elements, "Adresse")}</h2>
          }>
          <Row>
            <Column lg={6} md={6}>
              <ValidatedTextInput
                {...getRequiredTextInputProps(
                  handleRequiredFieldChange,
                  "city",
                  elements
                )}
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
                {...getTextInputProps("postal_code", elements)}
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
                {...getTextInputProps("street", elements)}
                name="street"
                invalid={!!errors?.street}
                invalidText={errors?.street}
                defaultValue={profile?.street}
              />
            </Column>
            <Column lg={2} md={2}>
              <TextInput
                {...getTextInputProps("house_number", elements)}
                name="house_number"
                invalid={!!errors?.house_number}
                invalidText={errors?.house_number}
                defaultValue={profile?.house_number}
              />
            </Column>
          </Row>
          {hasElement("room", conditionalElements[profileType]) && (
            <Row>
              <Column lg={8} md={4}>
                <TextInput
                  {...getTextInputProps(
                    "room",
                    conditionalElements[profileType]
                  )}
                  name="room"
                  invalid={!!errors?.room}
                  invalidText={errors?.room}
                  defaultValue={profile?.room}
                />
              </Column>
            </Row>
          )}
        </FormGroup>
      </div>
      <Seperator />

      <div className="hedi--group hedi--group--contact">
        <FormGroup
          legendText={
            <h2>{getUIElementValue("group-contact", elements, "Kontakt")}</h2>
          }>
          <Row>
            <Column lg={6} md={6}>
              <ValidatedTextInput
                {...getRequiredTextInputProps(
                  handleRequiredFieldChange,
                  "phone",
                  elements
                )}
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
            {hasElement("phone_private", conditionalElements[profileType]) && (
              <Column lg={6} md={6}>
                <TextInput
                  {...getTextInputProps(
                    "phone_private",
                    conditionalElements[profileType]
                  )}
                  name="phone_private"
                  invalid={!!errors?.phone_private}
                  invalidText={errors?.phone_private}
                  defaultValue={profile?.phone_private}
                />
              </Column>
            )}
          </Row>
          <Row>
            <Column lg={6} md={6}>
              <ValidatedTextInput
                {...getRequiredTextInputProps(
                  handleRequiredFieldChange,
                  "mail",
                  elements
                )}
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
            {hasElement("website", conditionalElements[profileType]) && (
              <Column lg={6} md={6}>
                <TextInput
                  {...getTextInputProps(
                    "website",
                    conditionalElements[profileType]
                  )}
                  name="website"
                  invalid={!!errors?.website}
                  invalidText={errors?.website}
                  defaultValue={profile?.website}
                />
              </Column>
            )}
          </Row>
          {hasElement(
            "consultation_hours",
            conditionalElements[profileType]
          ) && (
            <Row>
              <Column lg={6} md={6}>
                {/* <TextArea
                  {...getTextInputProps(
                    "consultation_hours",
                    conditionalElements[profileType]
                  )}
                  name="consultation_hours"
                  invalid={!!errors?.consultation_hours}
                  invalidText={errors?.consultation_hours}
                  defaultValue={profile?.consultation_hours}
                  placeholder="Mo-Di, Do-Fr 09:00 - 15:00"
                />  */}
              </Column>
            </Row>
          )}
        </FormGroup>
      </div>
      <Seperator />

      <div className="hedi--group hedi--group--consultation-hours">
        <FormGroup
          legendText={
            <h2>
              {getUIElementValue(
                "consultation_hours",
                conditionalElements[profileType],
                "consultation_hours"
              )}
            </h2>
          }>
          <Row>
            <ConsultationHoursSelection
              config={{
                elements,
                consultationDays: days,
                consultationTimeStart: timeRanges,
                consultationTimeEnd: timeRanges,
              }}
              data={profile?.consultationHours}
            />
          </Row>
        </FormGroup>
      </div>

      <Seperator />

      <div className="hedi--group hedi--group--language-skills">
        <FormGroup
          legendText={
            <h2>
              {getUIElementValue("group-languageSkills", elements, "Sprachen")}
            </h2>
          }>
          <Row>
            <LanguageSkillsSelection
              config={{
                elements,
                languageLevelElements,
                languageOptions,
              }}
              data={profile?.languageSkills}
            />
          </Row>
        </FormGroup>
      </div>

      {profileType !== "Midwife" && (
        <div className="hedi--group hedi--group--domains">
          <FormGroup
            legendText={
              <h4>
                {getUIElementValue(
                  "group-domains",
                  elements,
                  "Arbeitsschwerpunkt"
                )}
              </h4>
            }>
            <Row>
              <Column sm={4} md={6} lg={8} role="group">
                {domainOptions.map((option, index) => (
                  <SelectableTile
                    key={option.route}
                    id={option.type + index}
                    //@ts-ignore
                    name="domains"
                    value={option.route}
                    selected={profile?.domains.includes(option.route)}
                    onChange={() => {}}>
                    {option.label}
                  </SelectableTile>
                ))}
              </Column>
            </Row>
          </FormGroup>
        </div>
      )}

      {!!conditionalServiceGroups[profileType] && (
        <div className="hedi--group hedi--group--services">
          <FormGroup
            legendText={
              <h2>
                {getUIElementValue("group-services", elements, "Angebote")}
              </h2>
            }>
            <Row>
              {
                //key needs to include profile type because servicegroup items can change
                conditionalServiceGroups[profileType]?.map(serviceGroup => (
                  <Column lg={8} key={serviceGroup.route + profileType}>
                    <ServiceSelection
                      config={{ elements, serviceGroup }}
                      data={profile?.services}
                    />
                  </Column>
                ))
              }
            </Row>
          </FormGroup>
        </div>
      )}

      <Row>
        <Column lg={8} md={8}>
          {isValidating ? (
            <InlineLoading status="active" />
          ) : isSuccessfullySaved ? (
            <ToastNotification
              title={
                getUIElement("success_message", elements)?.value || "Success"
              }
              subtitle={getUIElement("success_message", elements)?.description}
              caption={<InlineLoading status="active" />}
              kind="success"
              lowContrast
              hideCloseButton
              style={{ width: "100%" }}
            />
          ) : hasError() ? (
            <ToastNotification
              title={getUIElement("error_message", elements)?.value || "Error"}
              subtitle={getUIElement("error_message", elements)?.description}
              caption=""
              kind="error"
              lowContrast
              hideCloseButton
              style={{ width: "100%" }}
            />
          ) : (
            <Button type="submit">
              {getUIElementValue("submit", elements, "Profil speichern")}
            </Button>
          )}
        </Column>

        <ValidationSummary validationErrors={validationErrorsForSummary} />
      </Row>
    </Form>
  );
};
