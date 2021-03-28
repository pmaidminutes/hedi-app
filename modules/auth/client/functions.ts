import { User } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/client";

export const getUser = (): [User | undefined, boolean] => {
  const [session, loading] = useSession();
  let user = undefined;
  if (!loading && session && session.user) user = { ...session.user };
  return [user, loading];
};

export const login = async (
  username: string,
  password: string,
  callbackUrl?: string
) =>
  signIn("credentials", { username, password, callbackUrl, redirect: false });

export const logout = () => signOut();
