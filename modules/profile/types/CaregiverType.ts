import {
  EntityFields,
  IEntityLocalized,
  IEntityTranslated,
  EntityTranslatedFields,
} from "@/modules/model";
import { AddressFields, IAddress } from "@/modules/model/IAddress";
import { ContactFields, IContact } from "@/modules/model/IContact";
import {
  DetailedNameFields,
  IDetailedName,
} from "@/modules/model/IDetailedName";

export interface ICaregiver
  extends IEntityTranslated<IEntityLocalized>,
    IDetailedName,
    IAddress,
    IContact {}

export function isICaregiver(obj: any): obj is ICaregiver {
  return obj && obj.typeName === "Caregiver";
}

export const CaregiverFields = `${EntityTranslatedFields}
${DetailedNameFields}
${AddressFields}
${ContactFields}
`;
