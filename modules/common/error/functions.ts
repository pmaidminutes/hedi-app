import { IHTTPError } from "./types";

export function errorHandling(response: Response) {
  return new Promise((resolve, reject) =>
    response.status !== 200
      ? resolve({ status: response.status, message: "Something went wrong !" })
      : resolve({ status: response.status, message: "No results yet!" })
  ) as Promise<IHTTPError>;
}
