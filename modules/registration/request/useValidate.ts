import { IHTTPError } from "@/modules/common/error";
import { jsonFetcher } from "@/modules/common/utils";
import useSWR from "swr";
import { IRegisterRequest, IRegisterResponse } from "../types";

export function useValidate(info: IRegisterRequest) {
  const validateResult = useSWR<IHTTPError | IRegisterResponse>(
    info.passcode ? "/api/register/validate/?" + encodeInfo(info) : null,
    url => jsonFetcher<IRegisterResponse>(url)
  );
  return { ...validateResult };
}

function encodeInfo(info: IRegisterRequest) {
  const infoParameters = new URLSearchParams();
  Object.entries(info).forEach(entry => {
    if (entry[1]) infoParameters.append(entry[0], entry[1]);
  });
  return infoParameters.toString();
}
