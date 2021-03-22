import { IHTTPError } from "@/modules/common/error";
import { jsonFetcher } from "@/modules/common/utils";
import useSWR from "swr";
import { IRegisterRequest, IRegisterResponse } from "../types";

export function useRegister(info: IRegisterRequest) {
  const registerResult = useSWR<IHTTPError | IRegisterResponse>(
    info.passcode || info.name || info.mail || info.pass
      ? "/api/register/?" + encodeInfo(info)
      : null,
    url => jsonFetcher<IRegisterResponse>(url)
  );
  return { ...registerResult };
}

function encodeInfo(info: IRegisterRequest) {
  const infoParameters = new URLSearchParams();
  Object.entries(info).forEach(entry => {
    if (entry[1]) infoParameters.append(entry[0], entry[1]);
  });
  return infoParameters.toString();
}
