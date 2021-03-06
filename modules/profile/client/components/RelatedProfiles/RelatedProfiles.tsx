import React from "react";
import { Grid, Row } from "carbon-components-react";
import { RelatedProfile } from "./RelatedProfile";
import { IBusinessProfileLink } from "@/modules/profile/types";

export type IRelatedProfilesProps = IRelatedProfiles &
  IRelatedProfilesDefinition;

export interface IRelatedProfiles {
  profileLinks: Partial<IBusinessProfileLink>[];
}

export interface IRelatedProfilesDefinition {
  relatedProfilesHeadline: string;
}

export const RelatedProfiles: React.FC<IRelatedProfilesProps> = props => {
  const { relatedProfilesHeadline, profileLinks } = props;
  return (
    <section className="hedi--related-profiles">
      <Grid>
        <h3>{relatedProfilesHeadline}</h3>
        <Row>
          {profileLinks.map((profile, index) => (
            <RelatedProfile key={index} {...profile} />
          ))}
        </Row>
      </Grid>
    </section>
  );
};
