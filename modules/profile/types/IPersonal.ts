import { gql } from "@/modules/graphql";
import { ProfileFields, IProfile } from "./IProfile";

export interface IPersonal extends IProfile {
  prefix?: string;
  givenName: string;
  familyName?: string;

  firstPregnancy: boolean;
}

export const PersonalTypeName = "Personal";

export function isIPersonal(obj: any): obj is IPersonal {
  return obj && obj?.type === PersonalTypeName;
}

export const PersonalGQL: string = gql`... on Personal {
  ${ProfileFields}
  prefix givenName familyName
  firstPregnancy
}`;
