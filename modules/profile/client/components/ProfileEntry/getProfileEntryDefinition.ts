import { IComponent, findLabelInstance } from "@/modules/model/components";
import { IProfileEntryDefinition } from "./ProfileEntry";

export const getProfileEntryDefinition = (
  components: IComponent[]
): IProfileEntryDefinition => {
  return {
    phoneTitle: findLabelInstance(components, "phoneTitle")?.text,
    emailTitle: findLabelInstance(components, "emailTitle")?.text,
    websiteTitle: findLabelInstance(components, "websiteTitle")?.text,
    servicesTitle: findLabelInstance(components, "servicesTitle")?.text,
  };
};
