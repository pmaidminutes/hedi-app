import Head from "next/head";
import useSWR from "swr";
import { getUser } from "@/modules/auth/client";
import { Content, Tile, TextInput, Button } from "carbon-components-react";
import { useState, useRef } from "react";

export default function AuthSandbox() {
  // session is null, if user is not logged in
  const [user, loading] = getUser();
  const [pwd, setPwd] = useState("");
  const pwdInput = useRef<any>(null);

  function handleClick() {
    const input = pwdInput.current;
    if (input && input.value) {
      setPwd(input.value);
    }
  }
  // just a demo api call, in this case it returns the authorization header
  // no need to check via session, if user is logged in. api has it's own func to know that
  const { data, error } = useSWR(
    `/api/sandbox/apiAuthDemo${pwd ? "?pwd=" + encodeURIComponent(pwd) : ""}`,
    async url => fetch(url).then(res => res.json())
  );
  return (
    <div>
      <Head>
        <title>HEDI Api Auth Sandbox</title>
      </Head>
      <Content>
        <Tile>
          <h1>HEDI App - Api Auth Sandbox</h1>
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
        ) : (
          <Tile>
            <h3>no user stored in client session</h3>
          </Tile>
        )}
        <Tile>
          <TextInput id="pwd" labelText="service Password" ref={pwdInput} />
          <Button onClick={handleClick}>Send</Button>
        </Tile>
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
