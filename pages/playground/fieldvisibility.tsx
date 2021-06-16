import { Column, Grid, Row } from "carbon-components-react";
import Head from "next/head";

export default function FieldPlayground() {
  return (
    <div>
      <Head>
        <title>Field Access</title>
      </Head>
      <Grid>
        <Row>
          <h1>FieldAccess</h1>
        </Row>
        <Row>
          <Column></Column>
        </Row>
      </Grid>
    </div>
  );
}
