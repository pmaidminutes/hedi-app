import {
  IProfile,
  IBusinessProfileLink,
  isIProfessional,
  isIOrganisation,
} from "@/modules/profile/types";

export const parseRelatedFromProfile = (
  profile: IProfile
): Partial<IBusinessProfileLink>[] => {
  if (isIProfessional(profile)) return profile.associations;
  else if (isIOrganisation(profile)) return profile.professionals;
  else return [];
};
