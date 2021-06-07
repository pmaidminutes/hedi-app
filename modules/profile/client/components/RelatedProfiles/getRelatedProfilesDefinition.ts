import { IComponent, findLabelInstance } from "@/modules/model/components";
import { IRelatedProfilesDefinition } from "./RelatedProfiles";

export const getRelatedProfilesDefinition = (
  components: IComponent[]
): IRelatedProfilesDefinition => {
  return {
    headline: findLabelInstance(components, "relatedProfilesHeadline")?.text,
  };
};
