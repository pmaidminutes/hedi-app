import Head from "next/head";
import { Content } from "carbon-components-react";
import { AuthDevOnly } from "@/modules/auth/client";

import { MessagingServiceProvider } from "@/modules/messaging/client/context";
import { MessagingAllInOne } from "@/modules/messaging/client/components/MessagingAllInOne";

export default function MSGPlayground() {
  return (
    <div>
      <Head>
        <title>HEDI App MSG</title>
      </Head>
      <Content>
        <AuthDevOnly />
        <MessagingServiceProvider>
          <MessagingAllInOne />
        </MessagingServiceProvider>
      </Content>
    </div>
  );
}
