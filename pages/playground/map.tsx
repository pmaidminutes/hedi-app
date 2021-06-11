import Head from "next/head";
import { Content } from "carbon-components-react";
import { AuthDevOnly } from "@/modules/auth/client";

import { MessagingServiceProvider } from "@/modules/messaging/client/context";
import { MessagingAllInOne } from "@/modules/messaging/client/components/MessagingAllInOne";
import { MapClient } from "@/modules/map/client";

export default function MapPlayground() {
  return (
    <div>
      <Head>
        <title>Map</title>
      </Head>
      <MapClient />
    </div>
  );
}
