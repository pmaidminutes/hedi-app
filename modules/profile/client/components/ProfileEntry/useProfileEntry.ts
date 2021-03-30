import { IAddress, IContact, IDetailedName } from "@/modules/model";
import { ICaregiver, Profile } from "@/modules/profile/types";
import { prettifyUrl, formatPhoneNumber } from "@/modules/common/utils";

export interface IEditButtonProps {
  text: string;
  link: string;
  isShowing: Boolean;
}
export interface IProfileEntryProps
  extends Pick<IAddress, "postal_code" | "city">,
    Pick<IDetailedName, "displayName">,
    Pick<IContact, "mail" | "website" | "phone">,
    Partial<Pick<Profile, "services" | "route">>,
    Partial<Pick<ICaregiver, "domains">> {
  servicesHeadline?: string;
  isNarrow?: boolean;
  editButtonProps?: IEditButtonProps;
  // isTitleAsLink?: boolean
}

export function useProfileEntry(props: IProfileEntryProps) {
  console.log({ props });
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
