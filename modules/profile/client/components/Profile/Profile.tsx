import { ICaregiver } from "../../../types";
import { Address } from "../Address";
import { Contact } from "../Contact";
import { DetailedName } from "../DetailedName";

interface IProfileProps {
  content: ICaregiver;
}

export const Profile = (content: IProfileProps) => {
  console.log({ content });
  const {
    street,
    house_number,
    postal_code,
    city,
    country,
    county,
    state,
    district,
    room,
    phone,
    phone_private,
    mail,
    website,
    consultation_hours,
    label,
    display,
    name,
    surname,
    suffix,
    prefix,
  } = content;
  return (
    <div>
      <Address
        addressdata={{
          street,
          house_number,
          postal_code,
          city,
          country,
          county,
          state,
          district,
          room,
        }}
      />
      <Contact
        contactdata={{
          phone,
          phone_private,
          mail,
          website,
          consultation_hours,
        }}
      />
      <DetailedName
        detailednamedata={{ label, display, name, surname, suffix, prefix }}
      />
    </div>
  );
};
