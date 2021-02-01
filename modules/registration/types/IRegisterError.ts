import { IRegisterInfo } from "./IRegisterInfo";

export interface IRegisterError extends IRegisterInfo {
  generic?: string;
}

export const RegisterErrorFields = `generic name mail pass`;
