import { useState, useEffect } from "react";
import { tryGetValue } from "@/modules/common/utils";
import { useCurrentProfileEntity } from "./useCurrentProfileEntity";
import { getUser } from "@/modules/auth/client";
import { IUIElementTexts } from "@/modules/model";

export function useEditProfileButton(
  lang: string,
  route: string,
  elements: IUIElementTexts[]
) {
  const [hasEditProfileBtn, setHasEditProfileBtn] = useState(false);

  const text = tryGetValue("edit_button", elements);
  const link = "/" + lang + "/user/profile/edit";

  const [user, userIsLoading] = getUser();
  const [currentProfile, currentProfileLoading] = useCurrentProfileEntity(
    user,
    lang
  );

  useEffect(() => {
    setHasEditProfileBtn(
      !currentProfileLoading &&
        !userIsLoading &&
        currentProfile &&
        currentProfile.route === route
        ? true
        : false
    );
  }, [currentProfile, currentProfileLoading, userIsLoading, route]);

  return {
    editButtonProps: {
      text,
      link,
      isShowing: hasEditProfileBtn,
    },
  };
}
