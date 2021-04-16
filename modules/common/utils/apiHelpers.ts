import { NextApiResponse, NextApiRequest } from "next";
import { IsIHTTPError, IHTTPError } from "../error";
import { IAuthHeader } from "@/modules/auth/types";
import { getUserAuthHeader } from "@/modules/auth/server";

interface ErrorSentStatus {
  isErrorSent: boolean;
}

interface UnauthorizedErrorSentStatus extends ErrorSentStatus {
  authHeader?: IAuthHeader;
}

export const sendAPIResult = (
  nextApiResponse: NextApiResponse<any>,
  responseObject: any
) => {
  if (IsIHTTPError(responseObject))
    sendAPIHttpError(nextApiResponse, responseObject);
  else if (responseObject != null && responseObject !== undefined)
    sendAPISuccess(nextApiResponse, responseObject);
  else sendAPIServerError(nextApiResponse);
};

export function sendAPIServerError(
  nextApiResponse: NextApiResponse,
  errorText?: string
) {
  nextApiResponse
    .status(500)
    .json({ success: false, errors: { general: errorText ?? "Server Error" } }); // TODO return language specific error
}

export function sendAPISuccess(
  nextApiResponse: NextApiResponse,
  result: object
) {
  nextApiResponse.status(200).json(result);
}

export function sendAPIUnauthorized(nextApiResponse: NextApiResponse) {
  nextApiResponse
    .status(401)
    .json({ success: false, errors: { generic: "Unauthorized" } }); // TODO: error text / handling
}

export function sendAPIHttpError(
  nextApiResponse: NextApiResponse,
  result: IHTTPError
) {
  nextApiResponse
    .status(result.status)
    .json({ success: false, errors: { http: result.message } });
}

export function sendAPINoBody(nextApiResponse: NextApiResponse) {
  nextApiResponse
    .status(400)
    .json({ success: false, errors: { generic: "no entity to save" } }); // TODO: how to return error (raw / translated)
}

export async function sendAPIErrorIfUnauthorised(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<UnauthorizedErrorSentStatus> {
  const authHeader = await getUserAuthHeader(req);
  if (!authHeader) {
    sendAPIUnauthorized(res);
    return { isErrorSent: true };
  }

  return { isErrorSent: false, authHeader };
}

export function sendAPIErrorResponseIfEmpty(
  req: NextApiRequest,
  res: NextApiResponse
): ErrorSentStatus {
  if (!req.body) {
    sendAPINoBody(res);
    return { isErrorSent: true };
  }

  return { isErrorSent: false };
}

export async function sendAPIErrorResponseIfEmptyOrUnauthorised(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<UnauthorizedErrorSentStatus> {
  const emptyErrorStatus = sendAPIErrorResponseIfEmpty(req, res);
  if (emptyErrorStatus.isErrorSent) {
    return emptyErrorStatus;
  }

  const unauthorizedErrorStatus = await sendAPIErrorIfUnauthorised(req, res);
  if (unauthorizedErrorStatus.isErrorSent) {
    return unauthorizedErrorStatus;
  }

  return { isErrorSent: false, authHeader: unauthorizedErrorStatus.authHeader };
}
