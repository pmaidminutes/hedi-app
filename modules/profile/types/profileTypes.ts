import { EntityFields, IEntity } from "@/modules/model";
import { AddressFields, IAddress } from "@/modules/model/IAddress";
import { ContactFields, IContact } from "@/modules/model/IContact";
import {
  DetailedNameFields,
  IDetailedName,
} from "@/modules/model/IDetailedName";

export interface IMidwife extends IEntity, IDetailedName, IAddress, IContact {
  verified: boolean;
  service_area: string;
}

export function isIMidwife(obj: any): obj is IMidwife {
  return obj && obj.typeName === "Midwife";
}

export const MidwifeFields = `${EntityFields}
${DetailedNameFields}
${AddressFields}
${ContactFields}
verified
service_area
`;

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

export interface IParent extends IEntity, IDetailedName, IAddress, IContact {
  birthdate: string;
  first_pregnancy: boolean;
}

export function isIParent(obj: any): obj is IParent {
  return obj && obj.typeName === "Parent";
}
export const ParentFields = `${EntityFields}
${DetailedNameFields}
${AddressFields}
${ContactFields}
birthdate
first_pregnancy
`;
