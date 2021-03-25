import React from "react";
import {
  IRelatedProfilesProps,
  useRelatedProfiles,
} from "./useRelatedProfiles";
import { AspectRatio, Row } from "carbon-components-react";
import { RelatedProfile } from "./RelatedProfile";

// TODO remove testdata
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
export const RelatedProfiles = (props: IRelatedProfilesProps) => {
  const { headline } = useRelatedProfiles(props);
  return (
    <section className="hedi--related-profiles">
      <AspectRatio ratio="2x1">
        <Row>
          {data.map((profile, index) => (
            <RelatedProfile key={index} {...profile} />
          ))}
        </Row>
      </AspectRatio>
    </section>
  );
};
