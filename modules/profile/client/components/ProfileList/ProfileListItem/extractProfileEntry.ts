import { transformStringToUrl } from "@/modules/common/utils";

export const extractProfileEntry = (profile: any, servicesHeadline: string) => {
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
    route,
  };
};
