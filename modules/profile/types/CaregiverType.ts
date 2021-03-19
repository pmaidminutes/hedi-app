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
import {
  AssociationsFields,
  IWithAssociations,
} from "@/modules/model/IWithAssociations";

export interface ICaregiver
  extends IEntityTranslated<IEntityLocalized>,
    IDetailedName,
    IAddress,
    IContact,
    IWithLanguageSkills,
    IWithAssociations {}

export function isICaregiver(obj: any): obj is ICaregiver {
  return obj && obj.type === "Caregiver";
}

export const CaregiverFields = `${EntityTranslatedFields}
${DetailedNameFields}
${AddressFields}
${ContactFields}
${WithLanguageSkillsFields}
${AssociationsFields}
`;
