import {
  IDataKind,
  DataKindFields,
  IDataVisibility,
  DataVisibilityFields,
} from "../taxonomyTypes";

export interface IAddress {
  dataKind: IDataKind;
  city: string;
  postalCode: number;
  latLongApprox: string;
  cityVisibility: IDataVisibility;
  street?: string;
  streetNumber?: string;
  latLong?: string;
  streetVisibility: IDataVisibility;
  additionalInfo?: string;
}

export const AddressFields = `
dataKind { ${DataKindFields} }
city postalCode
latLongApprox
cityVisibility { ${DataVisibilityFields} }
street streetNumber
latLong
streetVisibility { ${DataVisibilityFields} }
additionalInfo
`;

export interface IAddressInput {
  dataKind: number;
  city: string;
  postalCode: number;
  cityVisibility: number;
  street?: string;
  streetNumber?: string;
  streetVisibility: number;
  additionalInfo?: string;
}
