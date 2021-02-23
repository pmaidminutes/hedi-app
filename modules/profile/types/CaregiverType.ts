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

export interface ICaregiver
  extends IEntityTranslated<IEntityLocalized>,
    IDetailedName,
    IAddress,
    IContact,
    IWithAssociations {
  parents?: IParent[];
}

export function isICaregiver(obj: any): obj is ICaregiver {
  return obj && obj.type === "Caregiver";
}

export const CaregiverFields = `${EntityTranslatedFields}
${DetailedNameFields}
${AddressFields}
${ContactFields}
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

export const CaregiverRelationsFields = `${EntityTranslatedFields}
${DetailedNameFields}
${AddressFields}
${ContactFields}
parents
{
  ${ParentFields}
}
`;
