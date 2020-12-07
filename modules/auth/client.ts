import { User } from "next-auth";
import { 
  signIn, 
  signOut, 
  useSession, 
} from "next-auth/client";

export const getUser = (): [User | undefined, boolean] => {
  const [session, loading] = useSession();
  let user = undefined;
  if (!loading && session && session.user) user = { ...session.user };
  return [user, loading];
};

export const login = (username: string, password: string) => signIn('credentials', {username, password});

export const logout = () => signOut();