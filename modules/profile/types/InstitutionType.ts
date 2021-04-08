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

export interface IInstitution
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
export function isIInstitution(obj: any): obj is IInstitution {
  return obj && obj.type === "Institution";
}

export const InstitutionFields = `${EntityTranslatedFields}
  ${DetailedNameFields}
  ${AddressFields}
  ${ContactFields}
  ${WithLanguageSkillsFields}
  ${WithServiceFields}
  service_area
  ${MembersFields}
  `;
