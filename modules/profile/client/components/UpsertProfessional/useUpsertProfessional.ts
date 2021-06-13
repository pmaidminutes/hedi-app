import { ChangeEvent, FormEventHandler, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { getUser } from "@/modules/auth/client";
import { setProperty } from "@/modules/common/utils";
import { IProfessionalInput, ProfessionalInputDefault } from "../../../types";
import { editProfessional } from "../../request";
import { IConverterMap, useCombinedInputs } from "@/modules/react/hooks";

export function useUpsertProfessional(lang: string) {
  const [user, isLoading] = getUser();
  const { data, error, isValidating, mutate } = useSWR(
    user ? [user?.name] : null,
    _ => editProfessional(undefined, lang)
  );

  const parsers: IConverterMap<IProfessionalInput> = {
    profession: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target?.value
        ? parseInt(e.target?.value)
        : ProfessionalInputDefault.profession,
    prefix: null,
    givenName: (e: ChangeEvent<HTMLInputElement>) =>
      e.target?.value ?? ProfessionalInputDefault.givenName,
    familyName: null,
    addresses: e => e,
    phones: e => e,
    emails: e => e,
    websites: e => e,
    consultationHours: e => e,
    languageLevels: e => e,
  };
  const { state, ...inputStateMap } = useCombinedInputs(
    parsers,
    data?.profile ?? ProfessionalInputDefault
  );

  const router = useRouter();
  const [isSuccessfullySaved, setIsSuccessfullySaved] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    // TODO validate inputs
    const hasErrors = false;
    if (!hasErrors) {
      console.log(JSON.stringify(state, null, 2));
      mutate(
        editProfessional(state as IProfessionalInput, lang).then(resp => {
          if (resp?.success && resp?.route) {
            setIsSuccessfullySaved(true);
            //router.push(resp.route);
          }
          return resp;
        })
      );
    }
  };

  return {
    ...inputStateMap,
    isValidating,
    isSuccessfullySaved,
    handleSubmit,
  };
}
