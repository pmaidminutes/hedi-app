import { IComponent, findLabelInstance } from "@/modules/components/types";
import { IRelatedProfilesDefinition } from "./RelatedProfiles";

export const getRelatedProfilesDefinition = (
  components: IComponent[]
): IRelatedProfilesDefinition => {
  return {
    headline: findLabelInstance(components, "relatedProfilesHeadline")?.text,
  };
};
