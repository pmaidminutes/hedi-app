export interface IHTTPError {
  status: number;
  message?: string;
}

export function IsIHTTPError(arg: any): arg is IHTTPError {
  if (arg == null || typeof arg !== "object") return false;
  return "status" in arg;
}
