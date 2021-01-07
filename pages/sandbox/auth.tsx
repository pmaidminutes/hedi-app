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
  const { data, error } = useSWR("/api/sandbox/authDemo", async url =>
    fetch(url).then(res => res.json())
  );
  return (
    <div>
      <Head>
        <title>HEDI App Auth Sandbox</title>
      </Head>
      <Content>
        <Tile>
          <h1>HEDI App - Auth Sandbox</h1>
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
        {!loading && user ? (
          <Tile>
            <h3>client side data</h3>
            <p>
              <strong>name: </strong> {user.name}
            </p>
            <p>
              <strong>mail: </strong>
              {user.email}
            </p>
          </Tile>
        ) : null}
        {!error && data ? (
          <Tile>
            <h3>server side data</h3>
            {Object.entries(data).map(kv => (
              <p>
                <strong>{kv[0]}:</strong> {kv[1]}
              </p>
            ))}
          </Tile>
        ) : null}
      </Content>
    </div>
  );
}
