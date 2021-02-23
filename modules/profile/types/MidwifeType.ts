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
import {
  AssociationsFields,
  IWithAssociations,
} from "@/modules/model/IWithAssociations";
import { IParent, ParentFields } from "./ParentType";

export interface IMidwife
  extends IEntityTranslated<IEntityLocalized>,
    IDetailedName,
    IAddress,
    IContact,
    IWithAssociations {
  verified: boolean;
  service_area: string;
  parents?: IParent[];
}

export function isIMidwife(obj: any): obj is IMidwife {
  return obj && obj.type === "Midwife";
}

export const MidwifeFields = `${EntityTranslatedFields}
  ${DetailedNameFields}
  ${AddressFields}
  ${ContactFields}
  verified
  service_area
  associations
  {
    ... on Organisation
    { 
      ${AssociationsFields}
    }
    ... on Institution
    { 
      ${AssociationsFields}
    }
  }
  `;

export const MidwifeRelationsFields = `${EntityTranslatedFields}
  ${DetailedNameFields}
  ${AddressFields}
  ${ContactFields}
  verified
  service_area
  parents
  {
    ${ParentFields}
  }
  `;
