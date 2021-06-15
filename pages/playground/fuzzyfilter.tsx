import Head from "next/head";
import { useState } from "react";
import { FuzzyFilterDropdown } from "@/modules/common/components";
import { Column, Grid, Row } from "carbon-components-react";

const items = [
  {
    id: "option-1",
    label: "Kinderarzt",
  },
  {
    id: "option-2",
    label: "Kinderärztin",
  },
  {
    id: "option-3",
    label: "Pediatrist",
  },
  {
    id: "option-4",
    label: "Pediatristin",
  },
  {
    id: "option-5",
    label: "Nico",
  },
];

const ffdata = {
  placeholder: "Placeholder Text",
  titleText: "Title Text",
  helperText: "Helper Text",
  id: "Fuzzy",
};

const handleChange = () => {
  console.log('change from playground')
}

export default function FuzzyFilterPlayground() {
  return (
    <div>
      <Head>
        <title>Fuzzy Filter</title>
      </Head>
      <main style={{ padding: "50px" }}>
        <Grid>
          <Row>
            <h1>Fuzzy Filter</h1>
          </Row>
          <Row>
            <Column>
              <FuzzyFilterDropdown onChange={handleChange} items={items} {...ffdata} />
            </Column>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
