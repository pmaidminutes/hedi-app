import { EntityFields, IEntity } from "@/modules/model";
import { AddressFields, IAddress } from "@/modules/model/IAddress";
import { ContactFields, IContact } from "@/modules/model/IContact";
import {
  DetailedNameFields,
  IDetailedName,
} from "@/modules/model/IDetailedName";

export interface ICaregiver
  extends IEntity,
    IDetailedName,
    IAddress,
    IContact {}

export function isICaregiver(obj: any): obj is ICaregiver {
  return obj && obj.typeName === "Caregiver";
}

export const CaregiverFields = `${EntityFields}
${DetailedNameFields}
${AddressFields}
${ContactFields}
`;
