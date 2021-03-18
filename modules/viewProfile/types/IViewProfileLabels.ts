import {
  IEntity,
  ILocalized,
  implementsIEntity,
  implementsILocalized,
  implementsITyped,
  ITyped,
} from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";
import { IViewProfile } from "./IViewProfile";

export interface IEditProfileLabels
  extends ITyped,
    IEntity,
    ILocalized,
    IViewProfile,
    IWithKey {}
export const implementsIProfile = (obj: any) =>
  implementsITyped(obj) && implementsIEntity(obj) && implementsILocalized(obj);
