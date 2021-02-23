import { AddressFields, IAddress, implementsIAddress } from "./IAddress";
import { ContactFields, IContact, implementsIContact } from "./IContact";
import {
  DetailedNameFields,
  IDetailedName,
  implementsIDetailedName,
} from "./IDetailedName";
import { IEntityLocalized } from "./IEntityLocalized";
import { EntityTranslatedFields, IEntityTranslated } from "./IEntityTranslated";

export interface IProfile
  extends IEntityTranslated<IEntityLocalized>,
    IDetailedName,
    IAddress,
    IContact {}
export const implementsIProfile = (obj: any) =>
  implementsIDetailedName(obj) &&
  implementsIAddress(obj) &&
  implementsIContact(obj);

export function isIProfile(obj: any): obj is IProfile {
  return implementsIProfile(obj);
}

export const ProfileFields = `${EntityTranslatedFields}
${DetailedNameFields}
${AddressFields}
${ContactFields}
`;
