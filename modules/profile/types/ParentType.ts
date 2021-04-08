import {
  EntityFields,
  IEntity,
  IWithLanguageSkills,
  WithLanguageSkillsFields,
} from "@/modules/model";
import { AddressFields, IAddress } from "@/modules/model/IAddress";
import { ContactFields, IContact } from "@/modules/model/IContact";
import {
  DetailedNameFields,
  IDetailedName,
} from "@/modules/model/IDetailedName";
import { ProfileFields } from "@/modules/model/IProfile";
import { ChildrenFields } from "./ChildrenType";

export interface IParent
  extends IEntity,
    IDetailedName,
    IAddress,
    IContact,
    IWithLanguageSkills {
  birthdate: string;
  first_pregnancy: boolean;
}

// UNUSED
export function isIParent(obj: any): obj is IParent {
  return obj && obj.type === "Parent";
}
export const ParentFields = `${EntityFields}
${DetailedNameFields}
${AddressFields}
${ContactFields}
${WithLanguageSkillsFields}
birthdate
first_pregnancy
children
{
  ${ChildrenFields}
}
providers
{
  ${ProfileFields}
}
`;
