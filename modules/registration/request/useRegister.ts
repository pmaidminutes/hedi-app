import { useState } from "react";
import useSWR from "swr";
import { jsonFetcher } from "@/modules/common/utils";
import { IRegisterRequest, IRegisterResponse } from "../types";
import { signIn } from "next-auth/client";
import { useValidate } from "./useValidate";

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
            "/api/register/?" + encodeInfo(info)
          )
        )
      : setResponse({ errors: { passcode: "invalid" } } as IRegisterResponse);
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
    info.passcode || info.name || info.pass
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
