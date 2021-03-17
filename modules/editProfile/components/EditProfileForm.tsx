import { useState } from "react";
import { ChevronUp16, ChevronDown16 } from "@carbon/icons-react";
import {
  TextInput,
  Toggle,
  InlineNotification,
  TextArea,
} from "carbon-components-react";
import { IEditProfileError, IEditProfileRequest } from "../types";
import { Form, Button, FormGroup, Column, Row } from "carbon-components-react";
import { useEditProfileForm } from "./useEditProfileForm";
import { Seperator } from "@/modules/common/components";
import { ServiceSelections } from "./ServiceSelection";
type EditProfileInputProps = {
  errors?: IEditProfileError;
  infoLabels: { [key: string]: string };
  data: IEditProfileRequest | undefined;
};

export const EditProfileForm = ({
  errors,
  infoLabels,
  data,
}: EditProfileInputProps) => {
  const [hasChanged, setHasChanged] = useState(false);
  const [profileData, handleEditProfile, changes] = useEditProfileForm(data);
  const [showAdvancedName, setShowAdvancedName] = useState(false);
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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!hasChanged) return;
    handleEditProfile(e);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
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
          <Column sm={15} lg={8}>
            {!showAdvancedName ? (
              <Row>
                <Column>
                  <TextInput
                    id="name"
                    labelText={"Name"}
                    onChange={e => console.log(e)}
                    // invalid={!!errors?.prefix}
                    // invalidText={errors?.prefix}
                    defaultValue={`${prefix ? prefix : ""} ${
                      forename ? forename : ""
                    } ${surname ? surname : ""} ${suffix ? suffix : ""}`}
                  />
                </Column>
              </Row>
            ) : (
              <>
                <Row>
                  <Column>
                    <TextInput
                      id="prefix"
                      labelText={infoLabels?.prefix}
                      onChange={e => handleChange(e)}
                      invalid={!!errors?.prefix}
                      invalidText={errors?.prefix}
                      defaultValue={prefix}
                    />
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <TextInput
                      id="forename"
                      labelText={infoLabels?.forename}
                      onChange={e => handleChange(e)}
                      invalid={!!errors?.forename}
                      invalidText={errors?.forename}
                      defaultValue={forename}
                    />
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <TextInput
                      id="surname"
                      labelText={infoLabels?.surname}
                      onChange={e => handleChange(e)}
                      invalid={!!errors?.surname}
                      invalidText={errors?.surname}
                      defaultValue={surname}
                    />
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <TextInput
                      id="suffix"
                      labelText={infoLabels?.suffix}
                      onChange={e => handleChange(e)}
                      invalid={!!errors?.suffix}
                      invalidText={errors?.suffix}
                      defaultValue={suffix}
                    />
                  </Column>
                </Row>
              </>
            )}
          </Column>
          <Column sm={1}>
            <Button
              renderIcon={showAdvancedName ? ChevronUp16 : ChevronDown16}
              iconDescription="Icon Description"
              hasIconOnly
              onClick={() => setShowAdvancedName(prev => !prev)}
            />
          </Column>
        </Row>
      </FormGroup>
      <Seperator />
      <FormGroup legendText="Address">
        <Row>
          <Column lg={6}>
            <TextInput
              id="city"
              labelText={infoLabels?.city}
              onChange={e => handleChange(e)}
              invalid={!!errors?.city}
              invalidText={errors?.city}
              defaultValue={city}
            />
          </Column>
          <Column lg={2}>
            <TextInput
              id="postal_code"
              labelText={infoLabels?.postal_code}
              onChange={e => handleChange(e)}
              invalid={!!errors?.postal_code}
              invalidText={errors?.postal_code}
              defaultValue={postal_code}
            />
          </Column>
        </Row>
        <Row>
          <Column lg={6}>
            <TextInput
              id="street"
              labelText={infoLabels?.street}
              onChange={e => handleChange(e)}
              invalid={!!errors?.street}
              invalidText={errors?.street}
              defaultValue={street}
            />
          </Column>
          <Column lg={2}>
            <TextInput
              id="house_number"
              labelText={infoLabels?.house_number}
              onChange={e => handleChange(e)}
              invalid={!!errors?.house_number}
              invalidText={errors?.house_number}
              defaultValue={house_number}
            />
          </Column>
        </Row>
        <Row>
          <Column lg={2}>
            <TextInput
              id="room"
              labelText={infoLabels?.room}
              onChange={e => handleChange(e)}
              invalid={!!errors?.room}
              invalidText={errors?.room}
              defaultValue={room}
            />
          </Column>
        </Row>
      </FormGroup>
      <Seperator />
      <FormGroup legendText="Kontakt">
        <Row>
          <Column lg={6}>
            <TextInput
              id="phone"
              labelText={infoLabels?.phone}
              onChange={e => handleChange(e)}
              invalid={!!errors?.phone}
              invalidText={errors?.phone}
              defaultValue={phone}
            />
          </Column>
          <Column lg={6}>
            <TextInput
              id="phone_private"
              labelText={infoLabels?.phone_private}
              onChange={e => handleChange(e)}
              invalid={!!errors?.phone_private}
              invalidText={errors?.phone_private}
              defaultValue={phone_private}
            />
          </Column>
        </Row>
        <Row>
          <Column lg={6}>
            <TextInput
              id="mail"
              labelText={infoLabels?.mail}
              onChange={e => handleChange(e)}
              invalid={!!errors?.mail}
              invalidText={errors?.mail}
              defaultValue={mail}
              required
            />
          </Column>
          <Column lg={6}>
            <TextInput
              id="website"
              labelText={infoLabels?.website}
              onChange={e => handleChange(e)}
              invalid={!!errors?.website}
              invalidText={errors?.website}
              defaultValue={website}
            />
          </Column>
        </Row>
        <Row>
          <Column lg={6}>
            <TextArea
              id="consultation_hours"
              labelText={infoLabels?.consultation_hours}
              onChange={e => handleChange(e)}
              invalid={!!errors?.consultation_hours}
              invalidText={errors?.consultation_hours}
              defaultValue={consultation_hours}
              placeholder="Mo-Di, Do-Fr 09:00 - 15:00"
            />
          </Column>
        </Row>
      </FormGroup>
      <ServiceSelections />

      {profile_type?.toLowerCase() == "caregiver" ? <></> : null}

      {profile_type?.toLowerCase() == "parent" ? (
        <FormGroup legendText="Parent">
          <Toggle
            id="first_pregnancy"
            labelText={infoLabels?.first_pregnancy}
            onChange={e => handleChange(e)}
            checked={first_pregnancy === undefined ? false : first_pregnancy}
          />
        </FormGroup>
      ) : null}

      {profile_type?.toLowerCase() == "midwife" ? <></> : null}

      <Button type="submit" size="field">
        Submit
      </Button>
    </Form>
  );
};
