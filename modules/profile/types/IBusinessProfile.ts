import { EntityFields, IEntity } from "@/modules/model";
import {
  IWebsite,
  WebsiteFields,
  IConsultationHour,
  ConsultationHourFields,
  AddressFields,
} from "./dataTypes";
import {
  IProfession,
  ProfessionFields,
  IService,
  ServiceFields,
} from "./taxonomyTypes";
import { IProfile, ProfileFields } from "./IProfile";
import { AssociationTypeName, ProfessionalTypeName } from ".";

export interface IBusinessProfile extends IProfile {
  websites: IWebsite[];
  consultationHours: IConsultationHour[];
  profession: IProfession;
  services: IService[];
}

export const BusinessProfileTypeNames = [
  ProfessionalTypeName,
  AssociationTypeName,
];

export function isIBusinessProfile(obj: any): obj is IBusinessProfile {
  return obj && !!obj.type && BusinessProfileTypeNames.includes(obj.type);
}

export const BusinessProfileFields = `${ProfileFields}
websites { ${WebsiteFields} }
consultationHours { ${ConsultationHourFields} }
profession { ${ProfessionFields} }
services { ${ServiceFields} }
`;

export interface IBusinessProfileLink
  extends IEntity,
    Pick<IBusinessProfile, "profession" | "addresses"> {}

export const BusinessProfileLinkFields = `${EntityFields} 
addresses { ${AddressFields} }
profession { ${ProfessionFields} }
`;
