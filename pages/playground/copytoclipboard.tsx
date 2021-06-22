import Head from "next/head";
import { Column, Grid, Row, CopyButton } from "carbon-components-react";
import { CopyLinkToClipboard } from "@/modules/common/components";
import { ICopyLinkToClipboard } from "@/modules/common/components/CopyLinkToClipboard/transformCopyLinkToClipboard";

const link: ICopyLinkToClipboard = {
  link: "www.aidminutes.com",
  id: "nico",
  size: "lg",
};

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
            <CopyLinkToClipboard {...link} />
          </Row>
          <Row>
            <Column></Column>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
