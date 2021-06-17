import { Column, Grid, Row } from "carbon-components-react";
import { SelectFieldVisibility } from "@/modules/common/components";
import Head from "next/head";
import { ISelectItem } from "@/modules/components";
import { ISelectFieldVisibilty } from "@/modules/common/components/SelectFieldVisibility/transformSelectFieldVisibility";

const items: ISelectItem[] = [
  { label: "Öffentlich", index: 0, route: "" },
  {
    label: "Registrierte Benutzer*innen",
    index: 1,
    route: "",
  },
  { label: "Verbundene Benutzer*innen", index: 2, route: "" },
];

const data: ISelectFieldVisibilty = {
  items,
  value: 0,
  kind: "Select",
  id: "test",
};

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
          <Column>
            <SelectFieldVisibility {...data} />
          </Column>
        </Row>
      </Grid>
    </div>
  );
}
