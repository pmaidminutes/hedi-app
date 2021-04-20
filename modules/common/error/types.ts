import { ErrorMap } from "@/modules/model";

export interface IHTTPError {
  status: number;
  message?: string;
}

export interface IHTTPErrorResponse {
  success: boolean;
  errors: ErrorMap;
}

export function IsIHTTPError(arg: any): arg is IHTTPError {
  if (arg == null || typeof arg !== "object") return false;
  return "status" in arg;
}

export function IsIHTTPErrorResponse(arg: any): arg is IHTTPErrorResponse {
  if (arg == null || typeof arg !== "object") return false;
  return "success" in arg;
}
