import Head from "next/head";
import { useState } from "react";
import { Column, Grid, Row } from "carbon-components-react";

export default function CopyToClipboardPlayground() {
  return (
    <div>
      <Head>
        <title>Copy To Clipboard</title>
      </Head>
      <main style={{ padding: "50px" }}>
        <Grid>
          <Row>
            <h1>Copy To Clipboard</h1>
          </Row>
          <Row>
            <Column>CopyToClipboard</Column>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
