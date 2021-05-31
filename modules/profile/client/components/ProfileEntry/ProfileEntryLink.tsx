import React from "react";
import NextLink from "next/link";
import { ClickableTile } from "carbon-components-react";
import { ArrowRight24 } from "@carbon/icons-react";
import { ProfileEntry } from "@/modules/profile/client/components/ProfileEntry";
import { IProfileEntryProps } from "..";

export const ProfileEntryLink: React.FC<IProfileEntryProps> = props => {
  const route = props.route;
  const profileType =
    "hedi--profile-list__item" + props.profession
      ? " --" + props.profession
      : "";
  return (
    <NextLink href={route ?? "#"} passHref>
      <ClickableTile href={route} className={profileType ?? ""}>
        <ProfileEntry {...props} />
        <ArrowRight24 />
      </ClickableTile>
    </NextLink>
  );
};
