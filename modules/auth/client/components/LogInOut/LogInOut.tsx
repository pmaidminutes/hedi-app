import { getUser } from "../../functions";
import { Loading } from "carbon-components-react";
import { LogIn, LogOut } from "..";

export const LogInOut = () => {
  const [user, isLoading] = getUser();

  return isLoading ? (
    <Loading />
  ) : user ? (
    <LogOut label={`logged in as ${user.name}`} />
  ) : (
    <LogIn />
  );
};
