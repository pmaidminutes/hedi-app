import { FormEventHandler, useState } from "react";
import useSWR from "swr";
import { setProperty, tryGet, AssertClientSide } from "@/modules/common/utils";
import {
  IEditProfile,
  EditProfileFieldArray,
  EditProfileInput,
  IUpsertProfile,
} from "../../types";
import { upsertProfile } from "../../request";
import { useRouter } from "next/router";
import { IUIElementTexts } from "@/modules/model";

export function useEditProfileForm(
  lang: string,
  elements: IUIElementTexts[],
  username?: string | null
) {
  const { data, error, isValidating, mutate } = useSWR(
    ["/api/user/profile/edit", username],
    url => upsertProfile(url, { lang })
  );

  const router = useRouter();
  const [isSuccessfullySaved, setIsSuccessfullySaved] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const delta = {} as EditProfileInput;
    const newData = {} as EditProfileInput;
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
      setProperty(newData, key, value as any);
      if (value && value !== profileData?.[key]) {
        setProperty(delta, key, value as any);
        setProperty(profileData, key, value as any);
      }
    });
    const errors: { [key: string]: string } = {};
    ["city", "mail", "phone", "forename", "surname"].forEach(field => {
      if (!(delta as any)[field] && !(newData as any)[field])
        errors[field] = tryGet(field, elements)?.help || "";
    });

    if (Object.keys(errors).length == 0) {
      if (Object.keys(delta).length > 0) {
        mutate(
          upsertProfile("/api/user/profile/edit", {
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
    } else {
      mutate(
        {
          success: false,
          errors: errors,
          profile: newData,
        } as IUpsertProfile,
        false
      ).then(resp => {
        if (AssertClientSide()) {
          window.scrollTo(0, 60);
        }
      });
    }
  };

  return {
    data: data ?? { success: false },
    isValidating,
    isSuccessfullySaved,
    onSubmit,
  };
}
