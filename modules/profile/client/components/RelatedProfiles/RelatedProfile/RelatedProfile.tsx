import React from "react";
import { Column, ClickableTile } from "carbon-components-react";
import { ArrowRight24 } from "@carbon/icons-react";
import { IBusinessProfileLink } from "@/modules/profile/types";
import { parseAddressLine } from "./parseAddressLine";

export const RelatedProfile: React.FC<
  Partial<IBusinessProfileLink>
> = props => {
  const { label, route, profession, addresses } = props;
  const address = parseAddressLine(addresses);
  return (
    <Column md={4} lg={4} className="hedi--related-profiles--profile">
      <ClickableTile href={route}>
        <h4>{label}</h4>
        <h5>{profession?.label ?? ""}</h5>
        {address && <p>{address}</p>}
        <ArrowRight24 />
      </ClickableTile>
    </Column>
  );
};
