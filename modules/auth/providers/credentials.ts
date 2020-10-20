import Providers from 'next-auth/providers';
import { authorizeWithCredentials } from '../flow/authorizeWithCredentials';

interface ICredentials {
  csrfToken: string
  username: string
  password: string
}

// TODO: [auth] login view component
// TODO: [auth] login as modal/subcomponent
// TODO: [auth] login language specific

export const credentialProvider = 
  Providers.Credentials({
    name: 'HEDI App',
    credentials: {
      username: { label: "Username", type: "text", placeholder: "hedi" },
      password: { label: "Password", type: "password" }
    },
    authorize: async (credentials: any) => { //input type is not typed correctly
      const { username, password, csrfToken } = credentials as ICredentials;
      
      // TODO: [auth] error handling and error messages
      if (username && password) 
        return authorizeWithCredentials(username, password, csrfToken)
      else
        return null;
    }
  })
