import React from "react";
import {
  IRelatedProfilesProps,
  transformRelatedProfiles,
} from "./transformRelatedProfiles";
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
  const { headline, profiles } = transformRelatedProfiles(props);
  return (
    <section className="hedi--related-profiles">
      <Grid>
        <h3>{headline}</h3>
        <Row>
          {profiles
            ? profiles.map((profile, index) => (
                <RelatedProfile key={index} {...profile} />
              ))
            : data.map((profile, index) => (
                <RelatedProfile key={index} {...profile} />
              ))}
        </Row>
      </Grid>
    </section>
  );
};
