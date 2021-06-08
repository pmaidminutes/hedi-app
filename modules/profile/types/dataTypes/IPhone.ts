import {
  IDataKind,
  DataKindFields,
  IDataVisibility,
  DataVisibilityFields,
  IPhoneKind,
  PhoneKindFields,
} from "../taxonomyTypes";

export interface IPhone {
  dataKind: IDataKind;
  phone: string;
  phoneKind: IPhoneKind;
  dataVisibility: IDataVisibility;
}

export const PhoneFields = `
dataKind { ${DataKindFields} }
phone
phoneKind { ${PhoneKindFields} }
dataVisibility { ${DataVisibilityFields} }
`;
