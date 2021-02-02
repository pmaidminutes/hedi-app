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

export interface IOrganisation
  extends IEntityTranslated<IEntityLocalized>,
    IDetailedName,
    IAddress,
    IContact {
  service_area: string;
}

export function isIOrganisation(obj: any): obj is IOrganisation {
  return obj && obj.type === "Organisation";
}

export const OrganisationFields = `${EntityTranslatedFields}
  ${DetailedNameFields}
  ${AddressFields}
  ${ContactFields}
  service_area
  `;
