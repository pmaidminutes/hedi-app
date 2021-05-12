import {
  EntityTranslatedFields,
  IEntityLocalized,
  IEntityTranslated,
  IWithLanguageSkills,
  WithLanguageSkillsFields,
  IWithServices,
  WithServiceFields,
  IEntity,
  EntityFields,
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
    IWithServices,
    IWithAssociations {
  domains: IEntity[]; //TODO proper impl
}

export function isICaregiver(obj: any): obj is ICaregiver {
  return obj && obj.type === "Caregiver";
}

export const CaregiverGQL = `... on Caregiver {
${EntityTranslatedFields}
${DetailedNameFields}
${AddressFields}
${ContactFields}
${WithLanguageSkillsFields}
${WithServiceFields}
${AssociationsFields}
domains { ${EntityFields} }
}`;
