import React from "react";
import {
  AspectRatio,
  Row,
} from "carbon-components-react";
import { RelatedProfile } from "./RelatedProfile";
const data = [
  {
    longtitle: "Geburtshaus Sonnenschein",
    description: "Hebammenpraxis",
    city: "Hamburg",
    route: "/iwohin",
  },
  {
    longtitle: "Geburtshaus Sonnenschein",
    description: "Hebammenpraxis",
    city: "Hamburg",
    route: "/iwohin",
  },
  {
    longtitle: "Geburtshaus Sonnenschein",
    description: "Hebammenpraxis",
    city: "Hamburg",
    route: "/iwohin",
  },
  {
    longtitle: "Geburtshaus Sonnenschein",
    description: "Hebammenpraxis",
    city: "Hamburg",
    route: "/iwohin",
  },
];
// TODO take care of types and props
export const RelatedProfiles = () => {
  return (
    <section className="hedi__related-profiles">
      <AspectRatio ratio="16x9">
        {/* TODO apppage text */}
        <h2>Verknüpfte Profile</h2>
        <Row>
          {data.map(profile => (
            <RelatedProfile {...profile} />
          ))}
        </Row>
      </AspectRatio>
    </section>
  );
};
