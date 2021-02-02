import { EntityFields, IEntity } from "@/modules/model";
import {
  DetailedNameFields,
  IDetailedName,
} from "@/modules/model/IDetailedName";

export interface IChildren extends IEntity, IDetailedName {
  actualbirthdate: string;
  expectedbirthdate: string;
  birth_height: string;
  birth_weight: string;
}

export function isIChildren(obj: any): obj is IChildren {
  return obj && obj.type === "Child";
}
export const ChildrenFields = `${EntityFields}
${DetailedNameFields}
actualbirthdate
expectedbirthdate
birth_height
birth_weight
`;
