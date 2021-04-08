import {
  EntityLocalizedFields,
  IEntityLocalized,
  implementsIEntityLocalized,
} from "./IEntityLocalized";
import { IService, ServiceFields } from "./IService";

export interface IServiceGroup extends IEntityLocalized {
  caregiver: boolean;
  midwife: boolean;
  services: IService[];
}

export const implementsIServiceGroup = (obj: any) =>
  implementsIEntityLocalized(obj) && obj.description != null;

// UNUSED
export function isIServiceGroup(obj: any): obj is IServiceGroup {
  return implementsIServiceGroup(obj);
}

export const ServiceGroupFields = `${EntityLocalizedFields}
caregiver midwife
services { ${ServiceFields} }
`;
