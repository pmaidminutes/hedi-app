import { IProfile } from "@/modules/profile/types";
import { transformProfileToEntry } from "@/modules/profile/utils";
import { parseContactsFromProfile } from "../Contact";
import { parseRelatedFromProfile } from "../RelatedProfiles/parseFromProfile";

export const getProfileViewContent = (profile: IProfile) => {
  return {
    profileEntry: transformProfileToEntry(profile),
    contacts: parseContactsFromProfile(profile),
    relatedProfiles: parseRelatedFromProfile(profile),
  };
};
