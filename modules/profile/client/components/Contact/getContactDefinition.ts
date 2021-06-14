import { IComponent, findLabelInstance } from "@/modules/components/types";
import { IContactDefinition } from ".";

export const getContactDefinition = (
  components: IComponent[]
): IContactDefinition => {
  return {
    phoneTitle: findLabelInstance(components, "phone")?.text ?? "Telefonnummer",
    emailTitle:
      findLabelInstance(components, "email")?.text ?? "E-Mail Addresse",
    websiteTitle: findLabelInstance(components, "website")?.text ?? "Webseite",
    consultationHoursHeadline:
      findLabelInstance(components, "consultationHours")?.text ??
      "Sprechzeiten",
  };
};
