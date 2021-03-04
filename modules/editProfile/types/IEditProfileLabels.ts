import { ITyped, IEntity, ILocalized, implementsITyped, implementsIEntity, implementsILocalized } from "@/modules/model";
import { IProfile } from "@/modules/model/IProfile";
import { IWithKey } from "@/modules/model/IWithKey";

export interface IEditProfileLabels extends ITyped, IEntity, ILocalized ,IProfile, IWithKey{}
export const implementsIProfile = (obj: any) =>
  implementsITyped(obj) &&
  implementsIEntity(obj) &&
  implementsILocalized(obj);
  



