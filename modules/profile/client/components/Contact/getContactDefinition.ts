import { IComponent, findLabelInstance } from "@/modules/components/types";
import { IContactDefinition } from ".";

export const getContactDefinition = (
  components: IComponent[]
): IContactDefinition => {
  return {
    phoneTitle: findLabelInstance(components, "phoneTitle")?.text,
    emailTitle: findLabelInstance(components, "emailTitle")?.text,
    websiteTitle: findLabelInstance(components, "websiteTitle")?.text,
    consultationHoursHeadline: findLabelInstance(
      components,
      "consultationHoursHeadline"
    )?.text,
  };
};
