import { useState } from "react";
import useSWR from "swr";
import {
  IEditProfileRequest,
  IEditProfile,
  UpsertProfileFieldArray,
} from "../types";
function postProfile(url: string, profile: IEditProfile) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(profile),
  });
}
export function useEditProfileForm(data: IEditProfileRequest | undefined) {
  if (data === undefined) {
    console.warn("no data");
    return [];
  }

  const [newData, setNewData] = useState({});
  const [profileData, setProfileData] = useState<IEditProfile>(data);
  const [currentChanges, setCurrentChanges] = useState({});

  const { data: swrData, error: swrError } = useSWR(
    ["/api/account/editProfile", currentChanges],
    (url, profile) => postProfile(url, profile)
  );

  const handleProfileSubmit = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      prefix: { value: string };
      forename: { value: string };
      surname: { value: string };
      suffix: { value: string };
      city: { value: string };
      consultation_hours: { value: string };
      first_pregnancy: { checked?: boolean };
      house_number: { value: string };
      mail: { value: string };
      phone: { value: string };
      phone_private: { value: string };
      postal_code: { value: string };
      profile_type: { value: string };
      room: { value: string };
      street: { value: string };
      website: { value: string };
    };
    buildNewData(target);
    check();
  };

  const check = () => {
    compareObjects(profileData, newData);
  };

  // TODO: check which type
  function buildNewData(target: any) {
    UpsertProfileFieldArray.forEach(element => {
      if (target[element] !== undefined) {
        if (target[element].type === "text") {
          setNewData(prev => ({ ...prev, [element]: target[element].value }));
        }
        if (target[element].type === "checkbox") {
          setNewData(prev => ({ ...prev, [element]: target[element].checked }));
        }
      }
    });
  }

  // TODO Types
  function compareObjects(obj1: any, obj2: any) {
    // TODO Type
    let changes: any = {};
    for (const [key, value] of Object.entries(obj1)) {
      const hasKey = obj2.hasOwnProperty(key);

      if (hasKey) {
        if (obj2[key] !== value) {
          changes[key] = obj2[key];
        }
      }
    }
    setCurrentChanges(changes);
  }

  return [profileData, handleProfileSubmit, currentChanges] as const;
}
