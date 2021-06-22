import Head from "next/head";
import { Column, Grid, Row } from "carbon-components-react";
import { CopyLinkToClipboard } from "@/modules/common/components";
import { ICopyLinkToClipboard } from "@/modules/common/components/CopyLinkToClipboard/transformCopyLinkToClipboard";

const link: ICopyLinkToClipboard = {
  link: "www.aidminutes.com",
  id: "nico",
  type: "icon",
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
          </Row>
          <Row>
            <Column>
              <CopyLinkToClipboard {...link} />
            </Column>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
