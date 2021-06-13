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

export const WebsiteInputDefault: IWebsiteInput = {
  dataKind: 0,
  website: "",
  dataVisibility: 0,
};

export function websiteToInput(website: IWebsite): IWebsiteInput {
  return {
    dataKind: website.dataKind.index,
    website: website.website,
    dataVisibility: website.dataVisibility.index,
  };
}
