import { gql } from "@/modules/graphql";
import {
  ProfileFields,
  IProfile,
  IProfileInput,
  profileToInput,
} from "./IProfile";

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

export interface IPersonalInput extends IProfileInput {
  prefix?: string;
  givenName: string;
  familyName?: string;

  firstPregnancy: boolean;
}

export const PersonalInputDefault: IPersonalInput = {
  givenName: "",
  addresses: [],
  phones: [],
  emails: [],
  languageLevels: [],
  firstPregnancy: false,
};

export function personalToInput(personal: IPersonal): IPersonalInput {
  const {
    prefix,
    givenName,
    familyName,
    firstPregnancy,
    ...profile
  } = personal;
  return {
    prefix,
    givenName,
    familyName,
    firstPregnancy,
    ...profileToInput(profile),
  };
}
