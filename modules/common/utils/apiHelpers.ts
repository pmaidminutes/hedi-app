import { NextApiResponse } from "next";
import { IsIHTTPError } from "../error";

export const sendAPIResult = (
  nextApiResponse: NextApiResponse<any>,
  responseObject: any
) => {
  if (IsIHTTPError(responseObject))
    nextApiResponse
      .status(responseObject.code)
      .json({ success: false, errors: { http: responseObject.text } });
  else if (responseObject != null && responseObject !== undefined)
    nextApiResponse.status(200).json(responseObject);
  else
    nextApiResponse
      .status(500)
      .json({ success: false, errors: { general: "Server Error" } }); // TODO return language specific error
};
