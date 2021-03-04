import { ITyped, IEntity, ILocalized, implementsITyped, implementsIEntity, implementsILocalized } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";
import { IEditProfile } from "./IEditProfile";

export interface IEditProfileLabels extends ITyped, IEntity, ILocalized ,IEditProfile, IWithKey{}
export const implementsIProfile = (obj: any) =>
  implementsITyped(obj) &&
  implementsIEntity(obj) &&
  implementsILocalized(obj);
  



