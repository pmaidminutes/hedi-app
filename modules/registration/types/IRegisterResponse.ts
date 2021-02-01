import { IRegisterError, RegisterErrorFields } from "./IRegisterError";

export interface IRegisterResponse {
  success: boolean;
  error?: IRegisterError;
}

export const RegisterResponseFields = `success error { ${RegisterErrorFields} }`;
