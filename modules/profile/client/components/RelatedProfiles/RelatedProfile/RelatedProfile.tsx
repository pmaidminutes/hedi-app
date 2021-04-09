import React from "react";
import { Column, ClickableTile } from "carbon-components-react";
import {
  transformRelatedProfile,
  IRelatedProfile,
} from "./transformRelatedProfile";
import { ArrowRight24 } from "@carbon/icons-react";

export const RelatedProfile = (props: IRelatedProfile) => {
  const { longtitle, city, route, description } = transformRelatedProfile(
    props
  );
  return (
    <Column md={4} lg={4} className="hedi--related-profiles--profile">
      <ClickableTile>
        <h4>{longtitle}</h4>
        <h5>{description}</h5>
        <p>{city}</p>
        <ArrowRight24 />
      </ClickableTile>
    </Column>
  );
};
