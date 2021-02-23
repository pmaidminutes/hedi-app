import { IProfile, ProfileFields } from "@/modules/model/IProfile";

export interface IWithMembers extends IProfile {
  members: IProfile[];
}

export const implementsIWithMembers = (obj: any) => !!(obj && obj.texts);

export function isIWithMembers(obj: any): obj is IWithMembers {
  return implementsIWithMembers(obj);
}
//TODO just bring the names/route instead of whole entity probably
export const MembersFields = `${ProfileFields}
  `;
