import {
  EntityTranslatedFields,
  IEntityLocalized,
  IEntityTranslated,
  IWithLanguageSkills,
  IWithServices,
  WithLanguageSkillsFields,
  WithServiceFields,
} from "@/modules/model";
import { AddressFields, IAddress } from "@/modules/model/IAddress";
import { ContactFields, IContact } from "@/modules/model/IContact";
import {
  DetailedNameFields,
  IDetailedName,
} from "@/modules/model/IDetailedName";
import { IWithMembers, MembersFields } from "@/modules/model/IWithMembers";

export interface IOrganisation
  extends IEntityTranslated<IEntityLocalized>,
    IDetailedName,
    IAddress,
    IContact,
    IWithLanguageSkills,
    IWithServices,
    IWithMembers {
  service_area: string;
}

// UNUSED
export function isIOrganisation(obj: any): obj is IOrganisation {
  return obj && obj.type === "Organisation";
}

export const OrganisationFields = `${EntityTranslatedFields}
  ${DetailedNameFields}
  ${AddressFields}
  ${ContactFields}
  ${WithLanguageSkillsFields}
  ${WithServiceFields}
  service_area
  ${MembersFields}
  `;
