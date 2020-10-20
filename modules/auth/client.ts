import { User } from 'next-auth';
import { useSession } from 'next-auth/client';

export const getUser = ():[User|undefined, boolean] => {
  const [ session, loading ] = useSession();
  let user = undefined;
  if (!loading && session && session.user) 
    user = { ...session.user };
  return [
    user,
    loading 
  ];
}