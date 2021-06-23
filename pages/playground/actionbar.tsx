import Head from "next/head";
import { Column, Grid, Row } from "carbon-components-react";
import { ActionBar } from "@/modules/editorial/article/client";
import { IArticleAction } from "@/modules/editorial/article/types";

const actions: IArticleAction[] = [
  {
    type: "share",
    description: "Teilen",
    handler: () => console.log("blah"),
  },
];

export default function ActionBarPlayground() {
  return (
    <div>
      <Head>
        <title>Action Bar</title>
      </Head>
      <main style={{ padding: "50px" }}>
        <Grid>
          <Row>
            <h1>Action Bar</h1>
          </Row>
          <Row>
            <Column>
              <ActionBar actions={actions} />
            </Column>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
