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

export const AddressInputDefault: IAddressInput = {
  dataKind: 0,
  city: "",
  postalCode: 0,
  cityVisibility: 0,
  streetVisibility: 0,
};

export function addressToInput(address: IAddress): IAddressInput {
  const {
    dataKind,
    city,
    postalCode,
    cityVisibility,
    street,
    streetNumber,
    streetVisibility,
    additionalInfo,
  } = address;
  return {
    dataKind: dataKind.index,
    city,
    postalCode,
    cityVisibility: cityVisibility.index,
    street,
    streetNumber,
    streetVisibility: streetVisibility.index,
    additionalInfo,
  };
}
