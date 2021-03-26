import React from "react";
import { Column, ClickableTile, AspectRatio } from "carbon-components-react";
import { useRelatedProfile, IRelatedProfile } from "./useRelatedProfile";
import { ArrowRight24 } from "@carbon/icons-react";

export const RelatedProfile = (props: IRelatedProfile) => {
  const { longtitle, city, route, description } = useRelatedProfile(props);
  return (
    <Column sm={2} md={3} lg={3} className="hedi--related-profiles--profile">
      <ClickableTile href={route}>
        <AspectRatio ratio="1x1">
          <h4>{longtitle}</h4>
          <h5>{description}</h5>
          <p>{city}</p>
          <ArrowRight24 />
        </AspectRatio>
      </ClickableTile>
    </Column>
  );
};
