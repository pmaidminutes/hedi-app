import { findButtonInstance, IComponent } from "@/modules/model/components";
import { IProfileViewDefinition } from ".";
import { getContactDefinition } from "../Contact";
import { getProfileEntryDefinition } from "../ProfileEntry";
import { getRelatedProfilesDefinition } from "../RelatedProfiles";

export const getProfileViewDefinition = (
  components: IComponent[]
): IProfileViewDefinition => {
  return {
    profileEntryDefinition: getProfileEntryDefinition(components),
    profileEditButton: findButtonInstance(components, "profileEditButton"),
    contactDefinition: getContactDefinition(components),
    relatedProfilesDefinition: getRelatedProfilesDefinition(components),
  };
};
