
import { useState } from "react";
import useSWR from "swr";
import { TextInput, Toggle,InlineNotification } from "carbon-components-react";
import { IEditProfileError, IEditProfileRequest } from "../types";
import { useTextInput, useToggleInput } from "@/modules/react/hooks";
import { IProfile } from "@/modules/model/IProfile";
import { Form, Button } from "carbon-components-react";


type EditProfileInputProps = {
  errors?: IEditProfileError;
  infoLabels: { [key: string]: string };
  data: IEditProfileRequest | undefined;
};
function postProfile(url: string, profile: IProfile) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(profile),
  });
}

export const EditProfileForm = ({
  errors,
  infoLabels,
  data,
}: EditProfileInputProps) => {
  const [street, setStreet] = useTextInput(data?.street);
  const [forename, setForename] = useTextInput(data?.forename);
  const [surname, setSurname] = useTextInput(data?.surname);
  const [city, setCity] = useTextInput(data?.city);
  const [house_number, setHouseNumber] = useTextInput(data?.house_number);
  const [mail, setMail] = useTextInput(data?.mail);
  const [phone, setPhone] = useTextInput(data?.phone);
  const [postal_code, setPostalCode] = useTextInput(data?.postal_code);
  const [prefix, setPrefix] = useTextInput(data?.prefix);
  const [suffix, setSuffix] = useTextInput(data?.suffix);
  const [room, setRoom] = useTextInput(data?.room);
  const [website, setWebsite] = useTextInput(data?.website);
  const [phone_private, setPhonePrivate] = useTextInput(data?.phone_private);
  const [first_pregnancy, setFirstPregnancy] = useToggleInput(false);
  const [consultation_hours, setConsultationHours] = useTextInput(
    data?.consultation_hours
  );
  const country = "",
    county = "",
    displayAddress = "",
    displayName = "",
    district = "",
    lat = "",
    lat_approx = "",
    long = "",
    long_approx = "",
    profile_type = "",
    state = "";

    const[hasChanged, setHasChanged] = useState<IProfile>()
    let error: any;
    useSWR([hasChanged ? "/api/account/editProfile" : null, hasChanged], (url, profile) =>
      postProfile(url, profile)
    );
  
  return (
    
    <Form
    
      onSubmit={e => {
        e.preventDefault();
        if (
          setHasChanged &&
          (street ||
            forename ||
            surname ||
            city ||
            house_number ||
            mail ||
            phone ||
            postal_code ||
            prefix ||
            suffix ||
            room ||
            website ||
            consultation_hours ||
            first_pregnancy ||
            phone_private)
        ) {
          setHasChanged({
            street,
            forename,
            surname,
            city,
            house_number,
            mail,
            phone,
            postal_code,
            prefix,
            suffix,
            room,
            website,
            consultation_hours,
            first_pregnancy,
            phone_private,
            country,
            county,
            displayAddress,
            displayName,
            district,
            lat,
            lat_approx,
            long,
            long_approx,
            profile_type,
            state,
          });
        }
      }}>

     {error?.generic && (
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={error.generic}
        />
      )}
      <TextInput
        id={infoLabels?.street}
        labelText={infoLabels?.street}
        onChange={setStreet}
        invalid={!!errors?.street}
        invalidText={errors?.street}
        value={street}
      />
      <TextInput
        id={infoLabels?.forename}
        labelText={infoLabels?.forename}
        onChange={setForename}
        invalid={!!errors?.forename}
        invalidText={errors?.forename}
        value={forename}
      />
      <TextInput
        id={infoLabels?.surname}
        labelText={infoLabels?.surname}
        onChange={setSurname}
        invalid={!!errors?.surname}
        invalidText={errors?.surname}
        value={surname}
      />

      <TextInput
        id={infoLabels?.city}
        labelText={infoLabels?.city}
        onChange={setCity}
        invalid={!!errors?.city}
        invalidText={errors?.city}
        value={city}
      />

      <TextInput
        id={infoLabels?.house_number}
        labelText={infoLabels?.house_number}
        onChange={setHouseNumber}
        invalid={!!errors?.house_number}
        invalidText={errors?.house_number}
        value={house_number}
      />

      <TextInput
        id={infoLabels?.mail}
        labelText={infoLabels?.mail}
        onChange={setMail}
        invalid={!!errors?.mail}
        invalidText={errors?.mail}
        value={mail}
        required
      />

      <TextInput
        id={infoLabels?.phone}
        labelText={infoLabels?.phone}
        onChange={setPhone}
        invalid={!!errors?.phone}
        invalidText={errors?.phone}
        value={phone}
      />

      <TextInput
        id={infoLabels?.postal_code}
        labelText={infoLabels?.postal_code}
        onChange={setPostalCode}
        invalid={!!errors?.postal_code}
        invalidText={errors?.postal_code}
        value={postal_code}
      />

      <TextInput
        id={infoLabels?.prefix}
        labelText={infoLabels?.prefix}
        onChange={setPrefix}
        invalid={!!errors?.prefix}
        invalidText={errors?.prefix}
        value={prefix}
      />

      <TextInput
        id={infoLabels?.suffix}
        labelText={infoLabels?.suffix}
        onChange={setSuffix}
        invalid={!!errors?.suffix}
        invalidText={errors?.suffix}
        value={suffix}
      />

      {data?.profile_type?.toLowerCase() == "caregiver" ? (
        <>
          <TextInput
            id={infoLabels?.room}
            labelText={infoLabels?.room}
            onChange={setRoom}
            invalid={!!errors?.room}
            invalidText={errors?.room}
            value={room}
          />
          <TextInput
            id={infoLabels?.website}
            labelText={infoLabels?.website}
            onChange={setWebsite}
            invalid={!!errors?.website}
            invalidText={errors?.website}
            value={website}
          />
          <TextInput
            id={infoLabels?.consultation_hours}
            labelText={infoLabels?.consultation_hours}
            onChange={setConsultationHours}
            invalid={!!errors?.consultation_hours}
            invalidText={errors?.consultation_hours}
            value={consultation_hours}
          />
        </>
      ) : null}

      {data?.profile_type?.toLowerCase() == "parent" ? (
        <>
          <Toggle
            id={infoLabels?.first_pregnancy}
            labelText={infoLabels?.first_pregnancy}
            onChange={setFirstPregnancy}
            checked={first_pregnancy}
          />
        </>
      ) : null}

      {data?.profile_type?.toLowerCase() == "midwife" ? (
        <>
          <TextInput
            id={infoLabels?.phone_private}
            labelText={infoLabels?.phone_private}
            onChange={setPhonePrivate}
            invalid={!!errors?.phone_private}
            invalidText={errors?.phone_private}
            value={phone_private}
          />
          <TextInput
            id={infoLabels?.website}
            labelText={infoLabels?.website}
            onChange={setWebsite}
            invalid={!!errors?.website}
            invalidText={errors?.website}
            value={website}
          />
          <TextInput
            id={infoLabels?.consultation_hours}
            labelText={infoLabels?.consultation_hours}
            onChange={setConsultationHours}
            invalid={!!errors?.consultation_hours}
            invalidText={errors?.consultation_hours}
            value={consultation_hours}
          />
        </>
      ) : null}

      <Button type="submit" size="field">
        Submit
      </Button>
    </Form>
  );
};
