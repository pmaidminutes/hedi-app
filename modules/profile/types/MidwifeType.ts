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
