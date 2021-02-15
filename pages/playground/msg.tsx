import Head from "next/head";
import { useState } from "react";
import { Content } from "carbon-components-react";
import { getUser, LogInOut } from "@/modules/auth/client";

import { MatrixRoom } from "@/modules/messaging/types";
import { useMsgClient } from "@/modules/messaging/client/context";
import {
  Rooms,
  Messages,
  MessageInput,
} from "@/modules/messaging/client/components";
import { Dev } from "@/modules/messaging/client/components/Dev/Dev";

export default function RegPlayground() {
  const [user, loading] = getUser();

  // http://matrix-org.github.io/matrix-js-sdk/9.6.0/index.html
  const [running, setRunning] = useState<boolean>(false);
  const [room, setRoom] = useState<MatrixRoom>();
  const client = useMsgClient();
  client.onRunningChange = setRunning;
  if (user && !running) client.loginSSO();

  return (
    <div>
      <Head>
        <title>HEDI App MSG</title>
      </Head>
      <Content>
        <LogInOut />
        {user && (
          <>
            <Dev />
            <Rooms
              onSelect={item => {
                setRoom(item);
              }}
            />
          </>
        )}
        {user && room && (
          <>
            <Messages room={room} />
            <MessageInput room={room} />
          </>
        )}
      </Content>
    </div>
  );
}
