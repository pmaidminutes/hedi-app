import { IRegisterError } from "./IRegisterError";

export interface IRegisterResponse {
  success: boolean;
  errors?: IRegisterError;
}

export const RegisterResponseFields = `success errors`;
