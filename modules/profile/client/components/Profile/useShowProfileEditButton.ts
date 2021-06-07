import { getUser } from "@/modules/auth/client";
import { IEntityLocalized } from "@/modules/model";
import { useCurrentProfileRoute } from "../../hooks";

export const useShowProfileEditButton = (profile: IEntityLocalized) => {
  const [user, userIsLoading] = getUser();
  const [
    currentProfileRoute,
    currentProfileRouteIsLoading,
  ] = useCurrentProfileRoute(user, profile.lang);

  const loading = userIsLoading || currentProfileRouteIsLoading;
  return loading ? false : currentProfileRoute === profile.route;
};
