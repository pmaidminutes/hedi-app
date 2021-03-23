import {
  EntityTranslatedFields,
  IEntityLocalized,
  IEntityTranslated,
  IWithLanguageSkills,
  ServiceFields,
  WithLanguageSkillsFields,
  IService,
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

export interface IMidwife
  extends IEntityTranslated<IEntityLocalized>,
    IDetailedName,
    IAddress,
    IContact,
    IWithLanguageSkills,
    IWithAssociations {
  verified: boolean;
  service_area: string;
  services: IService[];
}

export function isIMidwife(obj: any): obj is IMidwife {
  return obj && obj.type === "Midwife";
}

export const MidwifeFields = `${EntityTranslatedFields}
  ${DetailedNameFields}
  ${AddressFields}
  ${ContactFields}
  ${WithLanguageSkillsFields}
  verified
  service_area
  ${AssociationsFields}
  services { ${ServiceFields} }
  `;
