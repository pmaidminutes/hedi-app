import { FormEventHandler, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { setProperty } from "@/modules/common/utils";
import {
  IProfessionalInput,
  IUpsertProfessionalResponse,
  professionalToInput,
} from "../../../types";
import { upsertProfessional } from "../../request";

export type UpsertProfessionalResponse = Omit<
  IUpsertProfessionalResponse,
  "profile"
> & { profile: IProfessionalInput };

export function useUpsertProfessional(lang: string, username?: string | null) {
  const { data, error, isValidating, mutate } = useSWR([username], _ =>
    upsertProfessional(undefined, lang).then(resp => {
      if (resp?.profile) {
        const { profile, ...rest } = resp;
        return {
          profile: professionalToInput(profile),
          ...rest,
        };
      } else return resp as UpsertProfessionalResponse | null;
    })
  );

  const router = useRouter();
  const [isSuccessfullySaved, setIsSuccessfullySaved] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const profileInput = {} as IProfessionalInput;
    const profileData = data?.profile;

    if (false) {
      mutate(
        upsertProfessional(profileInput, lang).then(resp => {
          if (resp?.success && resp?.route) {
            setIsSuccessfullySaved(true);
            router.push(resp.route);
          }
          if (resp?.profile) {
            const { profile, ...rest } = resp;
            return {
              profile: professionalToInput(profile),
              ...rest,
            };
          } else return resp as UpsertProfessionalResponse | null;
        })
      );
    }
  };

  return {
    data:
      data ?? ({ success: false, errors: {} } as UpsertProfessionalResponse),
    isValidating,
    isSuccessfullySaved,
    handleSubmit,
  };
}
