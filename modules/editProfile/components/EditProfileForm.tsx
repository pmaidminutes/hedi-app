import { FormEvent, FormEventHandler, useState } from "react";
import {
  Form,
  Button,
  FormGroup,
  Column,
  Row,
  TextInput,
  Toggle,
  InlineNotification,
} from "carbon-components-react";
import { IEditProfile } from "../types";
import { useEditProfileForm } from "./useEditProfileForm";

type EditProfileInputProps = {
  errors?: { [key: string]: string };
  infoLabels: { [key: string]: string };
  data: IEditProfile | undefined;
};

export const EditProfileForm = ({
  errors,
  infoLabels,
  data,
}: EditProfileInputProps) => {
  const [hasChanged, setHasChanged] = useState(false);
  const [profileData, handleEditProfile, changes] = useEditProfileForm(data);
  const {
    prefix,
    forename,
    surname,
    suffix,
    city,
    consultation_hours,
    first_pregnancy,
    house_number,
    mail,
    phone,
    phone_private,
    postal_code,
    profile_type,
    room,
    street,
    website,
  } = profileData;

  let error: any;

  const handleSubmit: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!hasChanged) return;
    const form = e.target as HTMLFormElement;
    handleEditProfile(new FormData(form));
    setHasChanged(false);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setHasChanged(true);
  };

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      {error?.generic && (
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={error.generic}
        />
      )}
      <FormGroup legendText="Name">
        <Row>
          <Column>
            <TextInput
              id="prefix"
              name="prefix"
              labelText={infoLabels?.prefix}
              onChange={e => handleChange(e)}
              invalid={!!errors?.prefix}
              invalidText={errors?.prefix}
              defaultValue={prefix}
            />
          </Column>
          <Column>
            <TextInput
              id="forename"
              name="forename"
              labelText={infoLabels?.forename}
              onChange={e => handleChange(e)}
              invalid={!!errors?.forename}
              invalidText={errors?.forename}
              defaultValue={forename}
            />
          </Column>
          <Column>
            <TextInput
              id="surname"
              name="surname"
              labelText={infoLabels?.surname}
              onChange={e => handleChange(e)}
              invalid={!!errors?.surname}
              invalidText={errors?.surname}
              defaultValue={surname}
            />
          </Column>
          <Column>
            <TextInput
              id="suffix"
              name="suffix"
              labelText={infoLabels?.suffix}
              onChange={e => handleChange(e)}
              invalid={!!errors?.suffix}
              invalidText={errors?.suffix}
              defaultValue={suffix}
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
              onChange={e => handleChange(e)}
              invalid={!!errors?.street}
              invalidText={errors?.street}
              defaultValue={street}
            />
          </Column>
          <Column>
            <TextInput
              id="house_number"
              name="house_number"
              labelText={infoLabels?.house_number}
              onChange={e => handleChange(e)}
              invalid={!!errors?.house_number}
              invalidText={errors?.house_number}
              defaultValue={house_number}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <TextInput
              id="postal_code"
              name="postal_code"
              labelText={infoLabels?.postal_code}
              onChange={e => handleChange(e)}
              invalid={!!errors?.postal_code}
              invalidText={errors?.postal_code}
              defaultValue={postal_code}
            />
          </Column>
          <Column>
            <TextInput
              id="city"
              name="city"
              labelText={infoLabels?.city}
              onChange={e => handleChange(e)}
              invalid={!!errors?.city}
              invalidText={errors?.city}
              defaultValue={city}
            />
          </Column>
        </Row>

        <TextInput
          id="mail"
          name="mail"
          labelText={infoLabels?.mail}
          onChange={e => handleChange(e)}
          invalid={!!errors?.mail}
          invalidText={errors?.mail}
          defaultValue={mail}
          required
        />
        <TextInput
          id="phone"
          name="phone"
          labelText={infoLabels?.phone}
          onChange={e => handleChange(e)}
          invalid={!!errors?.phone}
          invalidText={errors?.phone}
          defaultValue={phone}
        />
      </FormGroup>

      {profile_type?.toLowerCase() == "caregiver" ? (
        <FormGroup legendText="CareGiver">
          <TextInput
            id="room"
            name="room"
            labelText={infoLabels?.room}
            onChange={e => handleChange(e)}
            invalid={!!errors?.room}
            invalidText={errors?.room}
            defaultValue={room}
          />
          <TextInput
            id="website"
            name="website"
            labelText={infoLabels?.website}
            onChange={e => handleChange(e)}
            invalid={!!errors?.website}
            invalidText={errors?.website}
            defaultValue={website}
          />
          <TextInput
            id="consultation_hours"
            name="consultation_hours"
            labelText={infoLabels?.consultation_hours}
            onChange={e => handleChange(e)}
            invalid={!!errors?.consultation_hours}
            invalidText={errors?.consultation_hours}
            defaultValue={consultation_hours}
          />
        </FormGroup>
      ) : null}

      {profile_type?.toLowerCase() == "parent" ? (
        <FormGroup legendText="Parent">
          <Toggle
            id="first_pregnancy"
            name="first_pregnancy"
            labelText={infoLabels?.first_pregnancy}
            onChange={e => handleChange(e)}
            checked={first_pregnancy === undefined ? false : first_pregnancy}
          />
        </FormGroup>
      ) : null}

      {profile_type?.toLowerCase() == "midwife" ? (
        <FormGroup legendText="Midwife">
          <TextInput
            id="phone_private"
            name="phone_private"
            labelText={infoLabels?.phone_private}
            onChange={e => handleChange(e)}
            invalid={!!errors?.phone_private}
            invalidText={errors?.phone_private}
            defaultValue={phone_private}
          />
          <TextInput
            id="website"
            name="website"
            labelText={infoLabels?.website}
            onChange={e => handleChange(e)}
            invalid={!!errors?.website}
            invalidText={errors?.website}
            defaultValue={website}
          />
          <TextInput
            id="consultation_hours"
            name="consultation_hours"
            labelText={infoLabels?.consultation_hours}
            onChange={e => handleChange(e)}
            invalid={!!errors?.consultation_hours}
            invalidText={errors?.consultation_hours}
            defaultValue={consultation_hours}
          />
        </FormGroup>
      ) : null}

      <Button type="submit" size="field">
        Submit
      </Button>
    </Form>
  );
};
