import { useState } from "react";
import useSWR from "swr";
import { jsonFetcher } from "@/modules/common/utils";
import {
  IRegisterRequest,
  IRegisterResponse,
  registerAPIUrl,
} from "../../types";
import { signIn } from "next-auth/client";
import { useValidate } from "./useValidate";
import { getEncodeInfo } from "../functions";

export const useRegister = () => {
  const [response, setResponse] = useState<IRegisterResponse>({
    success: false,
  });
  const [loading, setLoading] = useState(false);
  const register = async (info: IRegisterRequest) => {
    setLoading(true);
    const codeResponse = await useValidate(info);
    codeResponse?.success
      ? setResponse(
          await jsonFetcher<IRegisterResponse>(
            registerAPIUrl + "/?" + getEncodeInfo(info)
          )
        )
      : setResponse({
          errors: { registrationcode: "invalid" },
        } as IRegisterResponse);
    setLoading(false);
  };

  const autoSignIn = (info: IRegisterRequest, redirect?: string) => {
    const dest = `${window.location.protocol}//${window.location.hostname}${redirect}`;
    signIn("credentials", {
      username: info.name,
      password: info.pass,
      callbackUrl: dest,
    });
  };

  return { response, loading, register, autoSignIn };
};

export function useRegisterEager(info: IRegisterRequest) {
  const registerResult = useSWR<IRegisterResponse>(
    info.registrationcode || info.name || info.pass
      ? registerAPIUrl + "/?" + getEncodeInfo(info)
      : null,
    url => jsonFetcher<IRegisterResponse>(url)
  );
  return { ...registerResult };
}
