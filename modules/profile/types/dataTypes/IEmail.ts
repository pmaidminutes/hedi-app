import {
  IDataKind,
  DataKindFields,
  IDataVisibility,
  DataVisibilityFields,
} from "../taxonomyTypes";

export interface IEmail {
  dataKind: IDataKind;
  email: string;
  dataVisibility: IDataVisibility;
}

export const EmailFields = `
dataKind { ${DataKindFields} }
email
dataVisibility { ${DataVisibilityFields} }
`;

export interface IEmailInput {
  dataKind: number;
  email: string;
  dataVisibility: number;
}
