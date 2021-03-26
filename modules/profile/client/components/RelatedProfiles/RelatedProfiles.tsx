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
      <AspectRatio ratio="16x9">
        <Row>
          {data.map((profile, index) => (
            <RelatedProfile key={index} {...profile} />
          ))}
        </Row>
      </AspectRatio>
    </section>
  );
};
