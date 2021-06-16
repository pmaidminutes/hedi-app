import { EntityFields, IEntity } from "@/modules/model";
import {
  IWebsite,
  WebsiteFields,
  IWebsiteInput,
  IConsultationHour,
  ConsultationHourFields,
  IConsultationHourInput,
  AddressFields,
} from "./dataTypes";
import {
  IProfession,
  ProfessionFields,
  IService,
  ServiceFields,
} from "./taxonomyTypes";
import { IProfile, IProfileInput, ProfileFields } from "./IProfile";
import { OrganisationTypeName, ProfessionalTypeName } from ".";

export interface IBusinessProfile extends IProfile {
  websites: IWebsite[];
  consultationHours: IConsultationHour[];
  profession: IProfession;
  services: IService[];
}

export function isIBusinessProfile(obj: any): obj is IBusinessProfile {
  const businessProfileTypeNames = [ProfessionalTypeName, OrganisationTypeName];
  return obj && !!obj.type && businessProfileTypeNames.includes(obj.type);
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

export interface IBusinessProfileInput extends IProfileInput {
  websites: IWebsiteInput[];
  consultationHours: IConsultationHourInput[];
  profession: number;
  services: string[];
}
