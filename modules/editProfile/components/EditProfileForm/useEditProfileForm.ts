import { FormEventHandler } from "react";
import useSWR from "swr";
import { jsonFetcher, setProperty } from "@/modules/common/utils";
import {
  IEditProfile,
  EditProfileFieldArray,
  EditProfileInput,
  IUpsertProfile,
} from "../../types";

function postProfile(
  url: string,
  profile: EditProfileInput
): Promise<IUpsertProfile> {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(profile),
  }).then(res => res.json());
}

export function useEditProfileForm() {
  const {
    data,
    error,
    isValidating,
    mutate,
  } = useSWR("/api/account/editProfile", url =>
    jsonFetcher<IUpsertProfile>(url)
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const delta = {} as EditProfileInput;
    const profileData = data?.profile ?? ({} as IEditProfile);
    EditProfileFieldArray.forEach(key => {
      let value = form.get(key)?.valueOf();
      if (value === "on") value = true;
      if (key === "domains" || key === "services" || key === "languageSkills")
        value = form.getAll(key)?.valueOf();
      if (value && value !== profileData?.[key]) {
        setProperty(delta, key, value as any);
        setProperty(profileData, key, value as any);
      }
    });
    if (Object.keys(delta).length > 0) {
      mutate({ success: false, profile: profileData }, false); //optimistic
      mutate(postProfile("/api/account/editProfile", delta));
    }
  };

  return { data: data ?? { success: false }, isValidating, onSubmit };
}
