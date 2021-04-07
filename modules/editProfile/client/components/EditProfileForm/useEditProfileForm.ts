import { FormEventHandler, useState } from "react";
import useSWR from "swr";
import { setProperty } from "@/modules/common/utils";
import {
  IEditProfile,
  EditProfileFieldArray,
  EditProfileInput,
  IUpsertProfile,
  editProfileAPIUrl,
} from "../../../types";
import { upsertProfile } from "../../request";
import { useRouter } from "next/router";
import { IUIElementTexts } from "@/modules/model";

export const orderedRequiredFields = [
  "forename",
  "surname",
  "city",
  "phone",
  "mail",
];

export function useEditProfileForm(
  lang: string,
  elements: IUIElementTexts[],
  username?: string | null
) {
  const { data, error, isValidating, mutate } = useSWR(
    [editProfileAPIUrl, username],
    url => upsertProfile(url, { lang })
  );

  const router = useRouter();
  const [isSuccessfullySaved, setIsSuccessfullySaved] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const delta = {} as EditProfileInput;
    const profileData = data?.profile ?? ({} as IEditProfile);

    EditProfileFieldArray.forEach(key => {
      let value = form.get(key)?.valueOf();
      if (value === "on") value = true;
      if (key === "domains" || key === "services")
        value = form.getAll(key)?.valueOf();
      if (key === "languageSkills")
        value = (form.getAll(key)?.valueOf() as string[])
          .map(v => JSON.parse(v))
          .sort((a, b) => b.level - a.level);
      if (typeof value !== "undefined" && value !== null)
        if (
          (typeof value === "string" && value !== (profileData?.[key] ?? "")) ||
          ((Array.isArray(value) || typeof value === "object") &&
            JSON.stringify(value) !== JSON.stringify(profileData?.[key]))
        ) {
          setProperty(delta, key, value as any);
          setProperty(profileData, key, value as any);
        }
    });

    if (Object.keys(delta).length > 0) {
      mutate(
        upsertProfile(editProfileAPIUrl, {
          profile: delta,
          lang,
        }).then(resp => {
          if (resp?.success && resp?.route) {
            setIsSuccessfullySaved(true);
            router.push(resp.route);
          }
          return resp;
        })
      );
    }
  };

  return {
    data: data ?? { success: false },
    isValidating,
    isSuccessfullySaved,
    onSubmit,
  };
}
