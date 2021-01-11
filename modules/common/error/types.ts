export interface IHTTPError {
  code: number;
  text: string;
}

export function IsIHTTPError(arg: any): arg is IHTTPError {
  if (!arg || typeof arg !== "object") return false;
  return "code" in arg && "text" in arg;
}
