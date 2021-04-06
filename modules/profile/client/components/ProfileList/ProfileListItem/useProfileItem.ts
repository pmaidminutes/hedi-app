import { isICaregiver, isIMidwife, Profile } from "@/modules/profile/types";
import { tryGetValue, transformStringToUrl } from "@/modules/common/utils";
import { IUIElementTexts } from "@/modules/model";

export interface IProfileItem {
  profile: Profile;
  elements: IUIElementTexts[];
}
export function useProfileItem(props: IProfileItem) {
  const { profile, elements } = props;
  const { route } = profile;

  const midwifeLabel = tryGetValue("domain_midwife", elements, "Hebamme");
  const servicesHeadline = tryGetValue("services", elements, "Tätigkeiten");

  const profileType = isICaregiver(profile)
    ? "hedi--profile-list__item--caregiver"
    : isIMidwife(profile)
    ? "hedi--profile-list__item--midwife"
    : null;

  return {
    midwifeLabel,
    servicesHeadline,
    route,
    profile,
    profileType,
  };
}

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
