import { IHTTPError } from "@/common/types";

export function errorHandling(response: Response) {
  return new Promise((resolve, reject) =>
    response.status !== 200
      ? resolve({ code: response.status, text: "Something went wrong !" })
      : resolve({ code: response.status, text: "No results yet!" })
  ) as Promise<IHTTPError>;
}
export function IsIHTTPError(arg: any): arg is IHTTPError {
  if (!arg || typeof arg !== "object") return false;
  return "code" in arg && "text" in arg;
}
