import React from "react";
import { Column, ClickableTile, AspectRatio } from "carbon-components-react";
import { useRelatedProfile, IRelatedProfile } from "./useRelatedProfile";
import { ArrowRight32 } from "@carbon/icons-react";

export const RelatedProfile = (props: IRelatedProfile) => {
  const { longtitle, city, route, description } = useRelatedProfile(props);
  return (
    <Column lg={4} className="hedi__related-profiles--profile">
      <ClickableTile href={route}>
        <AspectRatio ratio="3x4">
          <h3>{longtitle}</h3>
          <h4>{description}</h4>
          <p>{city}</p>
          <ArrowRight32 />
        </AspectRatio>
      </ClickableTile>
    </Column>
  );
};
