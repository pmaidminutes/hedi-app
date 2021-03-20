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
} from "carbon-components-react";
import { getTextInputProps } from "@/modules/common/utils";
import { Seperator } from "@/modules/common/components";
import { IEditProfileFormConfig, IUpsertProfile } from "../../types";
import { ServiceSelection } from "../ServiceSelection";

type ProfileTypes = "Parent" | "Caregiver" | "Midwife";

type EditProfileInputProps = FormProps & {
  config: IEditProfileFormConfig;
  data: IUpsertProfile;
  isValidating?: boolean;
};

const services = [
  "Sexualberatung",
  "Verhütungsberatung",
  "Schwangerenberatung",
  "Beratung bei Trennung und Scheidung",
];

export const EditProfileForm = ({
  config: {
    elements,
    conditionalElements,
    domainOptions,
    languageOptions,
    conditionalServiceGroups,
  },
  data: { success, errors, profile },
  isValidating,
  ...formProps
}: EditProfileInputProps) => {
  return (
    <Form {...formProps}>
      {errors?.generic && (
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={errors.generic}
        />
      )}

      <FormGroup legendText="Name">
        <Row>
          <Column lg={2}>
            <TextInput
              {...getTextInputProps("prefix", elements)}
              name="prefix"
              invalid={!!errors?.prefix}
              invalidText={errors?.prefix}
              defaultValue={profile?.prefix}
            />
          </Column>
          <Column lg={6}>
            <TextInput
              {...getTextInputProps("forename", elements)}
              name="forename"
              invalid={!!errors?.forename}
              invalidText={errors?.forename}
              defaultValue={profile?.forename}
            />
          </Column>
        </Row>
        <Row>
          <Column lg={6}>
            <TextInput
              {...getTextInputProps("surname", elements)}
              name="surname"
              invalid={!!errors?.surname}
              invalidText={errors?.surname}
              defaultValue={profile?.surname}
            />
          </Column>
          <Column lg={2}>
            <TextInput
              {...getTextInputProps("suffix", elements)}
              name="suffix"
              invalid={!!errors?.suffix}
              invalidText={errors?.suffix}
              defaultValue={profile?.suffix}
            />
          </Column>
        </Row>
      </FormGroup>
      <Seperator />
      <FormGroup legendText="Address">
        <Row>
          <Column lg={6}>
            <TextInput
              {...getTextInputProps("city", elements)}
              name="city"
              invalid={!!errors?.city}
              invalidText={errors?.city}
              defaultValue={profile?.city}
            />
          </Column>
          <Column lg={2}>
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
          <Column lg={6}>
            <TextInput
              {...getTextInputProps("street", elements)}
              name="street"
              invalid={!!errors?.street}
              invalidText={errors?.street}
              defaultValue={profile?.street}
            />
          </Column>
          <Column lg={2}>
            <TextInput
              {...getTextInputProps("house_number", elements)}
              name="house_number"
              invalid={!!errors?.house_number}
              invalidText={errors?.house_number}
              defaultValue={profile?.house_number}
            />
          </Column>
        </Row>
        <Row>
          <Column lg={2}>
            <TextInput
              {...getTextInputProps("room", elements)}
              name="room"
              invalid={!!errors?.room}
              invalidText={errors?.room}
              defaultValue={profile?.room}
            />
          </Column>
        </Row>
      </FormGroup>
      <Seperator />
      <FormGroup legendText="Kontakt">
        <Row>
          <Column lg={6}>
            <TextInput
              {...getTextInputProps("phone", elements)}
              name="phone"
              invalid={!!errors?.phone}
              invalidText={errors?.phone}
              defaultValue={profile?.phone}
            />
          </Column>
          <Column lg={6}>
            <TextInput
              {...getTextInputProps(
                "phone_private",
                conditionalElements.Midwife
              )}
              name="phone_private"
              invalid={!!errors?.phone_private}
              invalidText={errors?.phone_private}
              defaultValue={profile?.phone_private}
            />
          </Column>
        </Row>
        <Row>
          <Column lg={6}>
            <TextInput
              {...getTextInputProps("mail", elements)}
              name="mail"
              invalid={!!errors?.mail}
              invalidText={errors?.mail}
              defaultValue={profile?.mail}
              required
            />
          </Column>
          <Column lg={6}>
            <TextInput
              {...getTextInputProps("website", conditionalElements.Caregiver)}
              name="website"
              invalid={!!errors?.website}
              invalidText={errors?.website}
              defaultValue={profile?.website}
            />
          </Column>
        </Row>
        <Row>
          <Column lg={6}>
            <TextArea
              {...getTextInputProps(
                "consultation_hours",
                conditionalElements.Caregiver
              )}
              name="consultation_hours"
              invalid={!!errors?.consultation_hours}
              invalidText={errors?.consultation_hours}
              defaultValue={profile?.consultation_hours}
              placeholder="Mo-Di, Do-Fr 09:00 - 15:00"
            />
          </Column>
        </Row>
      </FormGroup>
      <ServiceSelection services={services} />

      {profile?.type === "Caregiver" ? (
        <FormGroup legendText="Caregiver">
          <TextInput
            {...getTextInputProps("room", conditionalElements.Caregiver)}
            name="room"
            invalid={!!errors?.room}
            invalidText={errors?.room}
            defaultValue={profile?.room}
          />
          <TextInput
            {...getTextInputProps("website", conditionalElements.Caregiver)}
            name="website"
            invalid={!!errors?.website}
            invalidText={errors?.website}
            defaultValue={profile?.website}
          />
          <TextInput
            {...getTextInputProps(
              "consultation_hours",
              conditionalElements.Caregiver
            )}
            name="consultation_hours"
            invalid={!!errors?.consultation_hours}
            invalidText={errors?.consultation_hours}
            defaultValue={profile?.consultation_hours}
          />
        </FormGroup>
      ) : null}

      {profile?.type === "Parent" ? (
        <FormGroup legendText="Parent">
          <Toggle
            id="first_pregnancy"
            name="first_pregnancy"
            labelText={
              getTextInputProps(
                "first_pregnancy",
                conditionalElements.Parent
              )?.labelText.toString() ?? ""
            }
            defaultToggled={profile?.first_pregnancy ?? false}
          />
        </FormGroup>
      ) : null}

      {profile?.type === "Midwife" ? (
        <FormGroup legendText="Midwife">
          <TextInput
            {...getTextInputProps("phone_private", conditionalElements.Midwife)}
            name="phone_private"
            invalid={!!errors?.phone_private}
            invalidText={errors?.phone_private}
            defaultValue={profile?.phone_private}
          />
          <TextInput
            {...getTextInputProps("website", conditionalElements.Midwife)}
            name="website"
            invalid={!!errors?.website}
            invalidText={errors?.website}
            defaultValue={profile?.website}
          />
          <TextInput
            {...getTextInputProps("website", conditionalElements.Midwife)}
            name="consultation_hours"
            invalid={!!errors?.consultation_hours}
            invalidText={errors?.consultation_hours}
            defaultValue={profile?.consultation_hours}
          />
        </FormGroup>
      ) : null}

      {isValidating ? (
        <InlineLoading status="active" />
      ) : (
        <Button type="submit">Submit</Button>
      )}
    </Form>
  );
};
