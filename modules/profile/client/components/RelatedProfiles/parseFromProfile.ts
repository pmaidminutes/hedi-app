import {
  IProfile,
  IBusinessProfileLink,
  isIProfessional,
  isIAssociation,
} from "@/modules/profile/types";

export const parseRelatedFromProfile = (
  profile: IProfile
): Partial<IBusinessProfileLink>[] => {
  if (isIProfessional(profile)) return profile.associations;
  else if (isIAssociation(profile)) return profile.professionals;
  else return [];
};
