import useSWR from "swr";
import { jsonFetcher } from "@/modules/common/utils";
import { IRegisterRequest, IRegisterResponse, validateAPIUrl } from "../types";

export async function useValidate(info: IRegisterRequest) {
  const validateResult = await jsonFetcher<IRegisterResponse>(
    validateAPIUrl + "/?" + encodeInfo(info)
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
