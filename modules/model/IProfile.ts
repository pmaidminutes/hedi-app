import { IAddress, implementsIAddress } from "./IAddress";
import { IContact, implementsIContact } from "./IContact";
import { IDetailedName, implementsIDetailedName } from "./IDetailedName";



export interface IProfile extends IDetailedName, IAddress, IContact  {
}
export const implementsIProfile = (obj: any) =>
  implementsIDetailedName(obj) &&
  implementsIAddress(obj) &&
  implementsIContact(obj);

export function isIProfile(obj: any): obj is IProfile {
  return implementsIProfile(obj);
}


