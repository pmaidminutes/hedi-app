import { gql } from "@/modules/graphql";
import { ProfileFields, IProfile } from "./IProfile";

export interface IPersonal extends IProfile {
  prefix?: string;
  givenName: string;
  familyName?: string;

  firstPregnancy: boolean;
}

export const PersonalGQL: string = gql`... on Personal {
  ${ProfileFields}
  prefix givenName familyName
  firstPregnancy
}`;
