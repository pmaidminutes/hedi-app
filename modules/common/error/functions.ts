import { IHTTPError } from "./types";

export function errorHandling(response: Response) {
  return new Promise((resolve, reject) =>
    response.status !== 200
      ? resolve({ code: response.status, text: "Something went wrong !" })
      : resolve({ code: response.status, text: "No results yet!" })
  ) as Promise<IHTTPError>;
}
