import { jsonFetcher } from "@/modules/common/utils";
import {
  IRegisterRequest,
  IRegisterResponse,
  validateAPIUrl,
} from "../../types";
import { getEncodeInfo } from "../functions";

export async function useValidate(info: IRegisterRequest) {
  const validateResult = await jsonFetcher<IRegisterResponse>(
    validateAPIUrl + "/?" + getEncodeInfo(info)
  );
  return { ...validateResult };
}
