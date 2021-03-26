import { IAddress, IContact, IDetailedName } from "@/modules/model";
import { ICaregiver, Profile } from "@/modules/profile/types";

export interface IProfileEntryProps
  extends Pick<IAddress, "postal_code" | "city">,
    Pick<IDetailedName, "displayName">,
    Pick<IContact, "mail" | "website" | "phone">,
    Partial<Pick<Profile, "services" | "route">>,
    Partial<Pick<ICaregiver, "domains">> {
  servicesHeadline?: string;
  isNarrow?: boolean;
  // isTitleAsLink?: boolean
}

export function useProfileEntry(props: IProfileEntryProps) {
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
  } = props;

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
  };
}
