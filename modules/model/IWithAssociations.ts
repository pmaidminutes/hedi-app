import { IProfile, ProfileFields } from "@/modules/model/IProfile";

export interface IWithAssociations extends IProfile {
  associations: IProfile[];
}

export const implementsIWithAssociations = (obj: any) =>
  !!(obj && obj.associations);

export function isIWithAssociations(obj: any): obj is IWithAssociations {
  return implementsIWithAssociations(obj);
}
//TODO just bring the names instead of whole entity probably
export const AssociationsFields = `
associations
{
  ... on Organisation
  { 
    ${ProfileFields}
  }
  ... on Institution
  { 
    ${ProfileFields}
  }
}
  `;
