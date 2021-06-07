import {
  IDataKind,
  DataKindFields,
  IDataVisibility,
  DataVisibilityFields,
} from "../taxonomyTypes";

export interface IWebsite {
  dataKind: IDataKind;
  website: string;
  dataVisibility: IDataVisibility;
}

export const WebsiteFields = `
dataKind { ${DataKindFields} }
website
dataVisibility { ${DataVisibilityFields} }
`;

export interface IWebsiteInput {
  dataKind: number;
  website: string;
  dataVisibility: number;
}
