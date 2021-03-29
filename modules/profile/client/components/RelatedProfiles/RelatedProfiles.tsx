import React from "react";
import {
  IRelatedProfilesProps,
  useRelatedProfiles,
} from "./useRelatedProfiles";
import { Grid, Row } from "carbon-components-react";
import { RelatedProfile } from "./RelatedProfile";

// TODO remove testdata
const data = [
  {
    longtitle: "Geburtshaus Sonnenschein",
    description: "Hebammenpraxis",
    city: "Hamburg",
    route: "/",
  },
  {
    longtitle: "Hebammenpraxis Eimsbüttel",
    description: "Hebammenpraxis",
    city: "Hamburg",
    route: "/",
  },
];
export const RelatedProfiles = (props: IRelatedProfilesProps) => {
  const { headline } = useRelatedProfiles(props);
  return (
    <section className="hedi--related-profiles">
      <Grid>
        <h3>{headline}</h3>
        <Row>
          {data.map((profile, index) => (
            <RelatedProfile key={index} {...profile} />
          ))}
        </Row>
      </Grid>
    </section>
  );
};
