import {
  EntityTranslatedFields,
  IEntityLocalized,
  IEntityTranslated,
  IWithLanguageSkills,
  WithLanguageSkillsFields,
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
    IWithMembers {
  service_area: string;
}

export function isIOrganisation(obj: any): obj is IOrganisation {
  return obj && obj.type === "Organisation";
}

export const OrganisationFields = `${EntityTranslatedFields}
  ${DetailedNameFields}
  ${AddressFields}
  ${ContactFields}
  ${WithLanguageSkillsFields}
  service_area
  ${MembersFields}
  `;
