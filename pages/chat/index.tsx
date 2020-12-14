/**
 * Chat Root
 *
 * for language switching see ../index.tsx
 */
import Head from "next/head";

import { Content, SideNav, ListItem } from "carbon-components-react";
import { useRouter } from "next/router";
import { LanguageSwitch } from "../../common/components";

export default function ChatIndex() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div>
      <Head>
        <title>HEDI App index</title>
      </Head>
      <SideNav
        isFixedNav
        expanded={true}
        isChildOfHeader={false}
        aria-label="Side Navigation">
        <ListItem>

        </ListItem>
      </SideNav>
      <Content>
        <h1>HEDI App Chat</h1>
        <p>HEDI App index, up and running</p>
        <p>{pathname}</p>
      </Content>
    </div>
  );
}
