import { prettifyUrl, formatPhoneNumber } from "@/modules/common/utils";

export interface IEditButtonProps {
  text: string;
  link: string;
  isShowing: Boolean;
}

export function transformProfileEntry(props: any) {
  const {
    displayName,
    postal_code,
    city,
    mail,
    website,
    phone,
    services,
    servicesHeadline,
    domains,
    route,
    isNarrow = false,
    editButtonProps,
  } = props;

  const prettyUrl = website ? prettifyUrl(website) : null;
  const phoneLink = phone ? formatPhoneNumber(phone) : null;

  const className =
    "hedi--profile-entry" +
    (services ? " hedi--profile-entry--with-services" : "");

  return {
    displayName,
    postal_code,
    city,
    mail,
    website,
    phone,
    services,
    servicesHeadline,
    domains,
    route,
    isNarrow,
    className,
    prettyUrl,
    phoneLink,
    editButtonProps,
  };
}
