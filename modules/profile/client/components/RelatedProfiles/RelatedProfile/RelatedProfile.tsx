import React from "react";
import { Column, ClickableTile, AspectRatio } from "carbon-components-react";
import { useRelatedProfile, IRelatedProfile } from "./useRelatedProfile";
import { ArrowRight32 } from "@carbon/icons-react";

export const RelatedProfile = (props: IRelatedProfile) => {
  const { longtitle, city, route, description } = useRelatedProfile(props);
  return (
    <Column sm={4} md={4} lg={4} className="hedi--related-profiles--profile">
      <ClickableTile href={route}>
        <AspectRatio ratio="1x1">
          <h3>{longtitle}</h3>
          <h4>{description}</h4>
          <p>{city}</p>
          <ArrowRight32 />
        </AspectRatio>
      </ClickableTile>
    </Column>
  );
};
