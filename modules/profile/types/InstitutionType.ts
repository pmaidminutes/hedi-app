import {
  EntityTranslatedFields,
  IEntityLocalized,
  IEntityTranslated,
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
    IWithMembers {
  service_area: string;
}

export function isIInstitution(obj: any): obj is IInstitution {
  return obj && obj.type === "Institution";
}

export const InstitutionFields = `${EntityTranslatedFields}
  ${DetailedNameFields}
  ${AddressFields}
  ${ContactFields}
  service_area
  ${MembersFields}
  `;
