import { findSelectInstance, IComponent } from "@/modules/components";
import { IUpsertProfessionalViewDefinition } from "./UpsertProfessional";
import {
  getAddressesInputDefinition,
  getConsultationHoursInputDefinition,
  getDetailedNameInputDefinition,
  getEmailsInputDefinition,
  getLanguageSkillsInputDefinition,
  getPhonesInputDefinition,
  getWebsitesInputDefinition,
} from "..";

export const getUpsertProfessionalViewDefinition = (
  components: IComponent[]
): IUpsertProfessionalViewDefinition => ({
  professionSelect: findSelectInstance(components, "professionSelect")!,
  detailedNameInputDefinition: getDetailedNameInputDefinition(components),
  addressesInputDefinition: getAddressesInputDefinition(components),
  phonesInputDefinition: getPhonesInputDefinition(components),
  emailsInputDefinition: getEmailsInputDefinition(components),
  websitesInputDefinition: getWebsitesInputDefinition(components),
  languageSkillsInputDefinition: getLanguageSkillsInputDefinition(components),
  consultationHoursInputDefinition: getConsultationHoursInputDefinition(
    components
  ),
});
