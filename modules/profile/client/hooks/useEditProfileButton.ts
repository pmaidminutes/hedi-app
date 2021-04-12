import { useState, useEffect } from "react";
import {
  getUIElementRedirectRoute,
  getUIElementValue,
} from "@/modules/common/utils";
import { useCurrentProfileEntity } from "./useCurrentProfileEntity";
import { getUser } from "@/modules/auth/client";
import { IEntity, IUIElementTexts } from "@/modules/model";

export function useEditProfileButton(
  lang: string,
  route: string,
  elements: IUIElementTexts[],
  links: (IEntity & {
    key: string;
  })[]
) {
  const [hasEditProfileBtn, setHasEditProfileBtn] = useState(false);

  const text = getUIElementValue("edit_button", elements);
  const link = getUIElementRedirectRoute("edit_redirect", elements, links);

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
