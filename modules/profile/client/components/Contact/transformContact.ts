import { prettifyUrl, formatPhoneNumber } from "@/modules/common/utils";
import { IContactProps } from ".";

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
