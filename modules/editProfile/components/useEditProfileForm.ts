import { useState } from "react";
import useSWR from "swr";
import { setProperty } from "@/modules/common/utils";
import {
  IEditProfile,
  EditProfileFieldArray,
  EditProfileInput,
} from "../types";

function postProfile(url: string, profile: IEditProfile) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(profile),
  });
}

export function useEditProfileForm(data?: IEditProfile) {
  if (data === undefined) {
    console.warn("no data");
    return [];
  }

  const [profileData, setProfileData] = useState<IEditProfile>(data);
  const [delta, setDelta] = useState({});

  const { data: swrData, error: swrError } = useSWR(
    ["/api/account/editProfile", delta],
    (url, profile) => postProfile(url, profile)
  );

  const handleProfileSubmit = (form: FormData) => {
    const delta = {} as EditProfileInput;
    EditProfileFieldArray.forEach(key => {
      let value = form.get(key)?.valueOf();
      if (value && value !== profileData[key]) {
        setProperty(delta, key, value as string | boolean);
        setProperty(profileData, key, value as string | boolean);
      }
    });
    setProfileData({ ...profileData });
    setDelta(delta);
  };

  return [profileData, handleProfileSubmit, delta] as const;
}
