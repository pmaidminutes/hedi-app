import Head from "next/head";
import useSWR from "swr";
import { signIn, signOut } from "next-auth/client";
import { getUser } from "@/modules/auth/client";
import { Content, Tile, Button } from "carbon-components-react";

export default function AuthSandbox() {
  // session is null, if user is not logged in
  const [user, loading] = getUser();

  // just a demo api call, in this case it returns the authorization header
  // no need to check via session, if user is logged in. api has it's own func to know that
  const { data, error } = useSWR(
    user ? "/api/msg/ssoPlayground" : null,
    async url => fetch(url).then(res => res.json())
  );
  return (
    <div>
      <Head>
        <title>HEDI App SSO Sandbox</title>
      </Head>
      <Content>
        <Tile>
          <h1>HEDI App - SSO Sandbox</h1>
        </Tile>
        <Tile>
          {
            // signIn triggers the login flow
            !loading && user ? (
              <Button onClick={signOut}>Sign Out</Button>
            ) : (
              <Button onClick={signIn}>Sign In</Button>
            )
          }
        </Tile>
        {!loading && user ? <Tile>{JSON.stringify(user, null, 1)}</Tile> : null}
        {data ? <Tile>{JSON.stringify(data, null, 1)}</Tile> : null}

        {error ? <Tile>{JSON.stringify(error, null, 1)}</Tile> : null}
      </Content>
    </div>
  );
}
