import { IRegisterInfo } from "./IRegisterInfo";

export interface IRegisterError extends IRegisterInfo {
  generic?: string;
  code?: boolean;
}

export const RegisterErrorFields = `generic name mail pass`;
