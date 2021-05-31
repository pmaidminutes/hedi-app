import { useState, useEffect } from "react";
import {
  getUIElementRedirectRoute,
  getUIElementValue,
} from "@/modules/common/utils";
import { useCurrentProfileRoute } from "./useCurrentProfileRoute";
import { getUser } from "@/modules/auth/client";
import { IEntity, IUIElementTexts } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";

export function useEditProfileButton(
  lang: string,
  route: string,
  elements: IUIElementTexts[],
  links: (IEntity & IWithKey)[]
) {
  const [hasEditProfileBtn, setHasEditProfileBtn] = useState(false);

  const text = getUIElementValue("edit_button", elements);
  const link = getUIElementRedirectRoute("edit_redirect", elements, links);

  const [user, userIsLoading] = getUser();
  const [
    currentProfileRoute,
    currentProfileRouteIsLoading,
  ] = useCurrentProfileRoute(user, lang);

  useEffect(() => {
    setHasEditProfileBtn(
      !currentProfileRouteIsLoading &&
        !userIsLoading &&
        currentProfileRoute === route
        ? true
        : false
    );
  }, [currentProfileRoute, currentProfileRouteIsLoading, userIsLoading, route]);

  return {
    editButtonProps: {
      text,
      link,
      isShowing: hasEditProfileBtn,
    },
  };
}
