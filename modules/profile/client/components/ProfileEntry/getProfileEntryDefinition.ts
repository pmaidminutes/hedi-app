import { IComponent, findLabelInstance } from "@/modules/components/types";
import { IProfileEntryDefinition } from "./ProfileEntry";

export const getProfileEntryDefinition = (
  components: IComponent[]
): IProfileEntryDefinition => {
  return {
    phoneTitle: findLabelInstance(components, "phone")?.text ?? "Telefonnummer",
    emailTitle:
      findLabelInstance(components, "email")?.text ?? "E-Mail Addresse",
    websiteTitle: findLabelInstance(components, "website")?.text ?? "Webseite",
    servicesTitle:
      findLabelInstance(components, "services")?.text ?? "Angebote",
  };
};
