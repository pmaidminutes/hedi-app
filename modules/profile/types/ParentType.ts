import { EntityFields, IEntity } from "@/modules/model";
import { AddressFields, IAddress } from "@/modules/model/IAddress";
import { ContactFields, IContact } from "@/modules/model/IContact";
import {
  DetailedNameFields,
  IDetailedName,
} from "@/modules/model/IDetailedName";

export interface IParent extends IEntity, IDetailedName, IAddress, IContact {
  birthdate: string;
  first_pregnancy: boolean;
}

export function isIParent(obj: any): obj is IParent {
  return obj && obj.type === "Parent";
}
export const ParentFields = `${EntityFields}
${DetailedNameFields}
${AddressFields}
${ContactFields}
birthdate
first_pregnancy
`;
