import { isICaregiver, isIMidwife, Profile } from "@/modules/profile/types";
import { transformStringToUrl } from "@/modules/common/utils";

export const extractProfileEntry = (
  profile: Profile,
  midwifeLabel: string,
  servicesHeadline: string
) => {
  const {
    displayName,
    postal_code,
    city,
    mail,
    website,
    phone,
    services,
    route,
  } = profile;
  const domainMidwife = {
    type: "Domain",
    label: midwifeLabel,
    route: "/" + midwifeLabel,
  };
  const domains = isICaregiver(profile)
    ? profile.domains
    : isIMidwife(profile)
    ? [domainMidwife]
    : undefined;
  // TODO transform Website at another place
  return {
    displayName,
    postal_code,
    city,
    mail,
    website: transformStringToUrl(website),
    phone,
    services,
    servicesHeadline,
    domains,
    route,
  };
};
