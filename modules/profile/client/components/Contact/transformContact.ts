import { TextInputProps } from "carbon-components-react";
import { IAddress, IContact } from "@/modules/model";
import { prettifyUrl, formatPhoneNumber } from "@/modules/common/utils";

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
  officeHrsHeadline: Pick<
    TextInputProps,
    "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
  >;
}

export function transformContact(props: IContactProps) {
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
    officeHrsHeadline,
  } = props;
  const prettyUrl = website ? prettifyUrl(website) : null;
  const phoneLink = phone ? formatPhoneNumber(phone) : null;
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
    officeHrsHeadline: officeHrsHeadline.labelText as String,
    prettyUrl,
    phoneLink,
  };
}
