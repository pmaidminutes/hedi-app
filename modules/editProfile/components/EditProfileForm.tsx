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
} from "carbon-components-react";
import { IUpsertProfile } from "../types";

type EditProfileInputProps = FormProps & {
  infoLabels: { [key: string]: string };
  data: IUpsertProfile;
  isValidating?: boolean;
};

export const EditProfileForm = ({
  infoLabels,
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
          <Column>
            <TextInput
              id="prefix"
              name="prefix"
              labelText={infoLabels?.prefix}
              invalid={!!errors?.prefix}
              invalidText={errors?.prefix}
              defaultValue={profile?.prefix}
            />
          </Column>
          <Column>
            <TextInput
              id="forename"
              name="forename"
              labelText={infoLabels?.forename}
              invalid={!!errors?.forename}
              invalidText={errors?.forename}
              defaultValue={profile?.forename}
            />
          </Column>
          <Column>
            <TextInput
              id="surname"
              name="surname"
              labelText={infoLabels?.surname}
              invalid={!!errors?.surname}
              invalidText={errors?.surname}
              defaultValue={profile?.surname}
            />
          </Column>
          <Column>
            <TextInput
              id="suffix"
              name="suffix"
              labelText={infoLabels?.suffix}
              invalid={!!errors?.suffix}
              invalidText={errors?.suffix}
              defaultValue={profile?.suffix}
            />
          </Column>
        </Row>
      </FormGroup>
      <FormGroup legendText="Address">
        <Row>
          <Column>
            <TextInput
              id="street"
              name="street"
              labelText={infoLabels?.street}
              invalid={!!errors?.street}
              invalidText={errors?.street}
              defaultValue={profile?.street}
            />
          </Column>
          <Column>
            <TextInput
              id="house_number"
              name="house_number"
              labelText={infoLabels?.house_number}
              invalid={!!errors?.house_number}
              invalidText={errors?.house_number}
              defaultValue={profile?.house_number}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <TextInput
              id="postal_code"
              name="postal_code"
              labelText={infoLabels?.postal_code}
              invalid={!!errors?.postal_code}
              invalidText={errors?.postal_code}
              defaultValue={profile?.postal_code}
            />
          </Column>
          <Column>
            <TextInput
              id="city"
              name="city"
              labelText={infoLabels?.city}
              invalid={!!errors?.city}
              invalidText={errors?.city}
              defaultValue={profile?.city}
            />
          </Column>
        </Row>

        <TextInput
          id="mail"
          name="mail"
          labelText={infoLabels?.mail}
          invalid={!!errors?.mail}
          invalidText={errors?.mail}
          defaultValue={profile?.mail}
          required
        />
        <TextInput
          id="phone"
          name="phone"
          labelText={infoLabels?.phone}
          invalid={!!errors?.phone}
          invalidText={errors?.phone}
          defaultValue={profile?.phone}
        />
      </FormGroup>

      {profile?.profile_type?.toLowerCase() == "caregiver" ? (
        <FormGroup legendText="CareGiver">
          <TextInput
            id="room"
            name="room"
            labelText={infoLabels?.room}
            invalid={!!errors?.room}
            invalidText={errors?.room}
            defaultValue={profile?.room}
          />
          <TextInput
            id="website"
            name="website"
            labelText={infoLabels?.website}
            invalid={!!errors?.website}
            invalidText={errors?.website}
            defaultValue={profile?.website}
          />
          <TextInput
            id="consultation_hours"
            name="consultation_hours"
            labelText={infoLabels?.consultation_hours}
            invalid={!!errors?.consultation_hours}
            invalidText={errors?.consultation_hours}
            defaultValue={profile?.consultation_hours}
          />
        </FormGroup>
      ) : null}

      {profile?.profile_type?.toLowerCase() == "parent" ? (
        <FormGroup legendText="Parent">
          <Toggle
            id="first_pregnancy"
            name="first_pregnancy"
            labelText={infoLabels?.first_pregnancy}
            defaultToggled={profile?.first_pregnancy ?? false}
          />
        </FormGroup>
      ) : null}

      {profile?.profile_type?.toLowerCase() == "midwife" ? (
        <FormGroup legendText="Midwife">
          <TextInput
            id="phone_private"
            name="phone_private"
            labelText={infoLabels?.phone_private}
            invalid={!!errors?.phone_private}
            invalidText={errors?.phone_private}
            defaultValue={profile?.phone_private}
          />
          <TextInput
            id="website"
            name="website"
            labelText={infoLabels?.website}
            invalid={!!errors?.website}
            invalidText={errors?.website}
            defaultValue={profile?.website}
          />
          <TextInput
            id="consultation_hours"
            name="consultation_hours"
            labelText={infoLabels?.consultation_hours}
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
