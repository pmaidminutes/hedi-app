import { IHTTPError } from "./types";

export function responseToIHTTPError(
  response: Response,
  message?: string
): IHTTPError {
  const { status, statusText } = response;
  return {
    status,
    message: message ?? statusText,
  };
}
