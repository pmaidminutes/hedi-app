import { TextInputProps } from "carbon-components-react";
import { IAddress, IContact } from "@/modules/model";

export interface IContactProps
  extends Pick<
      IAddress,
      "postal_code" | "city" | "displayAddress" | "house_number" | "street"
    >,
    Pick<IContact, "mail" | "website" | "phone" | "consultation_hours"> {
  headline: Pick<
    TextInputProps,
    "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
  >;
}

export function useContact(props: IContactProps) {
  const {
    phone,
    mail,
    website,
    consultation_hours,
    street,
    house_number,
    city,
    displayAddress,
    postal_code,
    headline,
  } = props;

  const { labelText } = headline;

  return {
    phone,
    mail,
    website,
    consultation_hours,
    street,
    house_number,
    city,
    displayAddress,
    postal_code,
    headline: labelText as String,
  };
}
