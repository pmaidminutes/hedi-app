import {
  EntityFields,
  IEntityTranslated,
  IEntityLocalized,
  EntityTranslatedFields,
} from "@/modules/model";
import { AddressFields, IAddress } from "@/modules/model/IAddress";
import { ContactFields, IContact } from "@/modules/model/IContact";
import {
  DetailedNameFields,
  IDetailedName,
} from "@/modules/model/IDetailedName";

export interface IMidwife
  extends IEntityTranslated<IEntityLocalized>,
    IDetailedName,
    IAddress,
    IContact {
  verified: boolean;
  service_area: string;
}

export function isIMidwife(obj: any): obj is IMidwife {
  return obj && obj.typeName === "Midwife";
}

export const MidwifeFields = `${EntityTranslatedFields}
  ${DetailedNameFields}
  ${AddressFields}
  ${ContactFields}
  verified
  service_area
  `;
