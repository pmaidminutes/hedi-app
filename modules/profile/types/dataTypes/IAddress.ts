import {
  IDataKind,
  DataKindFields,
  IDataVisibility,
  DataVisibilityFields,
} from "../taxonomyTypes";

export interface IAddress {
  dataKind: IDataKind;
  dataVisibility: IDataVisibility;
  city: string;
  postalCode: number;
  latLongApprox: string;
  detailsVisibility: IDataVisibility;
  street?: string;
  streetNumber?: string;
  latLong?: string;
  additionalInfo?: string;
}

export const AddressFields = `
dataKind { ${DataKindFields} }
dataVisibility { ${DataVisibilityFields} }
city postalCode
latLongApprox
street streetNumber
latLong
additionalInfo
detailsVisibility { ${DataVisibilityFields} }
`;

export interface IAddressInput {
  dataKind: number;
  dataVisibility: number;
  city: string;
  postalCode: number;
  detailsVisibility: number;
  street?: string;
  streetNumber?: string;
  additionalInfo?: string;
}

export const AddressInputDefault: IAddressInput = {
  dataKind: 0,
  city: "",
  postalCode: 0,
  dataVisibility: 0,
  detailsVisibility: 0,
};

export function addressToInput(address: IAddress): IAddressInput {
  const {
    dataKind,
    dataVisibility,
    city,
    postalCode,
    detailsVisibility,
    street,
    streetNumber,
    additionalInfo,
  } = address;
  return {
    dataKind: dataKind.index,
    dataVisibility: dataVisibility.index,
    city,
    postalCode,
    detailsVisibility: detailsVisibility.index,
    street,
    streetNumber,
    additionalInfo,
  };
}
