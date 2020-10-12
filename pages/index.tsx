import Head from 'next/head'

import {Content, SideNav, SideNavLink} from 'carbon-components-react'

export default function Index() {
  return (
    <div>
      <Head>
        <title>HEDI App index</title>
      </Head>
      <SideNav
        isFixedNav
        expanded={true}
        isChildOfHeader={false}
      >
        <SideNavLink href="de">Deutsch</SideNavLink>
        <SideNavLink href="en">English</SideNavLink>
      </SideNav>
      <Content>
        <h1>
          HEDI App
        </h1>
        <p>HEDI App index, up and running</p>
     </Content>
    </div>
  )
}