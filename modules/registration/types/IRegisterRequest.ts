import { IRegisterInfo } from "./IRegisterInfo";

export interface IRegisterRequest extends IRegisterInfo {
  commit?: boolean;
}
