import { ProfileType } from "@/modules/profile/types";
import { FormEventHandler, useEffect, useState } from "react";

export const useProfileTypeSwitch = (initialType?: ProfileType) => {
  const [profileType, setProfileType] = useState(initialType ?? "Midwife");

  useEffect(() => {
    setProfileType(initialType ?? "Midwife");
  }, [initialType]);

  const handleContentSwitcherChange: FormEventHandler = e => {
    const { name } = (e as unknown) as { name: ProfileType };
    setProfileType(name);
  };

  return { profileType, handleContentSwitcherChange };
};
