import { FormEventHandler } from "react";
import useSWR from "swr";
import { setProperty } from "@/modules/common/utils";
import {
  IEditProfile,
  EditProfileFieldArray,
  EditProfileInput,
} from "../../types";
import { upsertProfile } from "../../request";

export function useEditProfileForm(lang: string) {
  const {
    data,
    error,
    isValidating,
    mutate,
  } = useSWR("/api/account/editProfile", url => upsertProfile(url, { lang }));

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
        value = (form.getAll(key)?.valueOf() as string[]).map(v =>
          JSON.parse(v)
        );
      if (value && value !== profileData?.[key]) {
        setProperty(delta, key, value as any);
        setProperty(profileData, key, value as any);
      }
    });
    if (Object.keys(delta).length > 0) {
      mutate({ success: false, profile: profileData }, false); //optimistic
      mutate(
        upsertProfile("/api/account/editProfile", { profile: delta, lang })
      );
    }
  };

  return { data: data ?? { success: false }, isValidating, onSubmit };
}
