import { getUser } from "@/modules/auth/client";
import { Loading } from "carbon-components-react";
import { LogIn, LogOut} from "./";

export const LogInOut = () => {
  const [user, loading] = getUser();

  return (
    (loading) 
    ? <Loading /> 
    : (user) 
      ? <LogOut label={`logged in as ${user.name}`}/>
      : <LogIn />
  );
};
