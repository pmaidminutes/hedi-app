import {
  IWebsite,
  WebsiteFields,
  IConsultationHour,
  ConsultationHourFields,
} from "./dataTypes";
import {
  IProfession,
  ProfessionFields,
  IService,
  ServiceFields,
} from "./taxonomyTypes";
import { IProfile, ProfileFields } from "./IProfile";

export interface IBusinessProfile extends IProfile {
  websites: IWebsite[];
  consultationHours: IConsultationHour[];
  profession: IProfession;
  services: IService[];
}

export const BusinessProfileFields = `${ProfileFields}
websites { ${WebsiteFields} }
consultationHours { ${ConsultationHourFields} }
profession { ${ProfessionFields} }
services { ${ServiceFields} }
`;
