import { useEffect } from "react";
import { TextInput, Toggle } from "carbon-components-react";
import {
  IEditProfileError,
  IEditProfileInfo,
  IEditProfileLabels,
  IEditProfileRequest,
} from "../../types";
import { useTextInput, useToggleInput } from "@/modules/react/hooks";

type EditProfileInputProps = {
  errors?: IEditProfileError;
  onChange?: (info: IEditProfileInfo) => void;
  infoLabels?: IEditProfileLabels[];
  data: IEditProfileRequest | undefined;
};

export const EditProfileInputs = ({
  errors,
  onChange,
  infoLabels,
  data,
}: EditProfileInputProps) => {
  console.log(
    "----------------------------------> data?.profile? :",
    data?.profile
  );
  const [street, setUserstreet] = useTextInput(data?.profile?.street);
  const [forename, setUserforename] = useTextInput(data?.profile?.forename);
  const [surname, setUsersurname] = useTextInput(data?.profile?.surname);
  const [city, setUsercity] = useTextInput(data?.profile?.city);
  const [house_number, setUserhousenumber] = useTextInput(
    data?.profile?.house_number
  );
  const [mail, setUsermail] = useTextInput(data?.profile?.mail);
  const [phone, setUserphone] = useTextInput(data?.profile?.phone);
  const [postal_code, setUserpostalcode] = useTextInput(
    data?.profile?.postal_code
  );
  const [prefix, setUserprefix] = useTextInput(data?.profile?.prefix);
  const [suffix, setUsersuffix] = useTextInput(data?.profile?.suffix);
  const [room, setUserroom] = useTextInput(data?.profile?.room);
  const [website, setUserwebsite] = useTextInput(data?.profile?.website);
  const [consultation_hours, setUserconsultationhours] = useTextInput(
    data?.profile?.consultation_hours
  );
  const [first_pregnancy, setUserfirstpregnancy] = useToggleInput(
    data?.profile?.first_pregnancy
  );
  const [phone_private, setUserphoneprivate] = useTextInput(
    data?.profile?.phone_private
  );

  useEffect(() => {
    if (
      onChange &&
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
      onChange({
        profile: {
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
        },
      });
    }
  }, [
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
  ]);

  const baseProfileLabels = infoLabels?.find(x => x.key == "profile")?.texts;
  const caregiverLabels = infoLabels?.find(x => x.key == "profile_caregiver")
    ?.texts;
  const parentLabels = infoLabels?.find(x => x.key == "profile_parent")?.texts;
  const midwifeLabels = infoLabels?.find(x => x.key == "profile_midwife")
    ?.texts;

  return (
    <>
      <TextInput
        id={baseProfileLabels?.street ? `${baseProfileLabels?.street}` : " "}
        labelText={
          baseProfileLabels?.street ? `${baseProfileLabels?.street}` : " "
        }
        onChange={setUserstreet}
        invalid={!!errors?.profile?.street}
        invalidText={errors?.profile?.street}
        value={street}
      />
      <TextInput
        id={
          baseProfileLabels?.forename ? `${baseProfileLabels?.forename}` : " "
        }
        labelText={
          baseProfileLabels?.forename ? `${baseProfileLabels?.forename}` : " "
        }
        onChange={setUserforename}
        invalid={!!errors?.profile?.forename}
        invalidText={errors?.profile?.forename}
        value={forename}
      />
      <TextInput
        id={baseProfileLabels?.surname ? `${baseProfileLabels?.surname}` : " "}
        labelText={
          baseProfileLabels?.surname ? `${baseProfileLabels?.surname}` : " "
        }
        onChange={setUsersurname}
        invalid={!!errors?.profile?.surname}
        invalidText={errors?.profile?.surname}
        value={data?.profile?.surname}
      />

      <TextInput
        id={baseProfileLabels?.city ? `${baseProfileLabels?.city}` : " "}
        labelText={baseProfileLabels?.city ? `${baseProfileLabels?.city}` : " "}
        onChange={setUsercity}
        invalid={!!errors?.profile?.city}
        invalidText={errors?.profile?.city}
        value={city}
      />

      <TextInput
        id={
          baseProfileLabels?.house_number
            ? `${baseProfileLabels?.house_number}`
            : " "
        }
        labelText={
          baseProfileLabels?.house_number
            ? `${baseProfileLabels?.house_number}`
            : " "
        }
        onChange={setUserhousenumber}
        invalid={!!errors?.profile?.house_number}
        invalidText={errors?.profile?.house_number}
        value={house_number}
      />

      <TextInput
        id={baseProfileLabels?.mail ? `${baseProfileLabels?.mail}` : " "}
        labelText={baseProfileLabels?.mail ? `${baseProfileLabels?.mail}` : " "}
        onChange={setUsermail}
        invalid={!!errors?.profile?.mail}
        invalidText={errors?.profile?.mail}
        value={mail}
      />

      <TextInput
        id={baseProfileLabels?.phone ? `${baseProfileLabels?.phone}` : " "}
        labelText={
          baseProfileLabels?.phone ? `${baseProfileLabels?.phone}` : " "
        }
        onChange={setUserphone}
        invalid={!!errors?.profile?.phone}
        invalidText={errors?.profile?.phone}
        value={phone}
      />

      <TextInput
        id={
          baseProfileLabels?.postal_code
            ? `${baseProfileLabels?.postal_code}`
            : " "
        }
        labelText={
          baseProfileLabels?.postal_code
            ? `${baseProfileLabels?.postal_code}`
            : " "
        }
        onChange={setUserpostalcode}
        invalid={!!errors?.profile?.postal_code}
        invalidText={errors?.profile?.postal_code}
        value={postal_code}
      />

      <TextInput
        id={baseProfileLabels?.prefix ? `${baseProfileLabels?.prefix}` : " "}
        labelText={
          baseProfileLabels?.prefix ? `${baseProfileLabels?.prefix}` : " "
        }
        onChange={setUserprefix}
        invalid={!!errors?.profile?.prefix}
        invalidText={errors?.profile?.prefix}
        value={prefix}
      />

      <TextInput
        id={baseProfileLabels?.suffix ? `${baseProfileLabels?.suffix}` : " "}
        labelText={
          baseProfileLabels?.suffix ? `${baseProfileLabels?.suffix}` : " "
        }
        onChange={setUsersuffix}
        invalid={!!errors?.profile?.suffix}
        invalidText={errors?.profile?.suffix}
        value={suffix}
      />

      {data?.profile?.profile_type?.toLowerCase() == "caregiver" ? (
        <>
          <TextInput
            id={caregiverLabels?.room ? `${caregiverLabels?.room}` : " "}
            labelText={caregiverLabels?.room ? `${caregiverLabels?.room}` : " "}
            onChange={setUserroom}
            invalid={!!errors?.profile?.room}
            invalidText={errors?.profile?.room}
            value={room}
          />
          <TextInput
            id={caregiverLabels?.website ? `${caregiverLabels?.website}` : " "}
            labelText={
              caregiverLabels?.website ? `${caregiverLabels?.website}` : " "
            }
            onChange={setUserwebsite}
            invalid={!!errors?.profile?.website}
            invalidText={errors?.profile?.website}
            value={website}
          />
          <TextInput
            id={
              caregiverLabels?.consultation_hours
                ? `${caregiverLabels?.consultation_hours}`
                : " "
            }
            labelText={
              caregiverLabels?.consultation_hours
                ? `${caregiverLabels?.consultation_hours}`
                : " "
            }
            onChange={setUserconsultationhours}
            invalid={!!errors?.profile?.consultation_hours}
            invalidText={errors?.profile?.consultation_hours}
            value={consultation_hours}
          />
        </>
      ) : null}

      {data?.profile?.profile_type?.toLowerCase() == "parent" ? (
        <>
          <Toggle
            id={
              parentLabels?.first_pregnancy
                ? `${parentLabels?.first_pregnancy}`
                : " "
            }
            labelText={
              parentLabels?.first_pregnancy
                ? `${parentLabels?.first_pregnancy}`
                : " "
            }
            onChange={setUserfirstpregnancy}
            checked={first_pregnancy}
          />
        </>
      ) : null}

      {data?.profile?.profile_type?.toLowerCase() == "midwife" ? (
        <>
          <TextInput
            id={
              midwifeLabels?.phone_private
                ? `${midwifeLabels?.phone_private}`
                : " "
            }
            labelText={
              midwifeLabels?.phone_private
                ? `${midwifeLabels?.phone_private}`
                : " "
            }
            onChange={setUserphoneprivate}
            invalid={!!errors?.profile?.phone_private}
            invalidText={errors?.profile?.phone_private}
            value={phone_private}
          />
          <TextInput
            id={midwifeLabels?.website ? `${midwifeLabels?.website}` : " "}
            labelText={
              midwifeLabels?.website ? `${midwifeLabels?.website}` : " "
            }
            onChange={setUserwebsite}
            invalid={!!errors?.profile?.website}
            invalidText={errors?.profile?.website}
            value={website}
          />
          <TextInput
            id={
              midwifeLabels?.consultation_hours
                ? `${midwifeLabels?.consultation_hours}`
                : " "
            }
            labelText={
              midwifeLabels?.consultation_hours
                ? `${midwifeLabels?.consultation_hours}`
                : " "
            }
            onChange={setUserconsultationhours}
            invalid={!!errors?.profile?.consultation_hours}
            invalidText={errors?.profile?.consultation_hours}
            value={consultation_hours}
          />
        </>
      ) : null}
    </>
  );
};
