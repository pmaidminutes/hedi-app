import { isICaregiver, isIMidwife, Profile } from "@/modules/profile/types";
import { getUIElementValue } from "@/modules/common/utils";
import { IUIElementTexts } from "@/modules/model";

export interface IProfileItem {
  profile: Profile;
  elements: IUIElementTexts[];
}
export function transformProfileItem(props: IProfileItem) {
  const { profile, elements } = props;
  const { route } = profile;

  const midwifeLabel = getUIElementValue("domain_midwife", elements, "Hebamme");
  const servicesHeadline = getUIElementValue(
    "services",
    elements,
    "Tätigkeiten"
  );

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
