import { User } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/client";

export const getUser = (): [User | undefined, boolean] => {
  const [session, isLoading] = useSession();
  let user = undefined;
  if (!isLoading && session && session.user) user = { ...session.user };
  return [user, isLoading];
};

export const login = async (
  username: string,
  password: string,
  callbackUrl?: string
) =>
  signIn("credentials", { username, password, callbackUrl, redirect: false });

export const logout = () => signOut();
