import {
  EntityTranslatedFields,
  IEntityTranslated,
  implementsIEntityTranslated,
} from "./IEntityTranslated";

export interface IService extends IEntityTranslated<IService> {
  groupLabel: string;
}

export const implementsIService = (obj: any) =>
  implementsIEntityTranslated(obj) && obj.description != null;

export function isIService(obj: any): obj is IService {
  return implementsIService(obj);
}

export const ServiceFields = `${EntityTranslatedFields}
groupLabel
`;
