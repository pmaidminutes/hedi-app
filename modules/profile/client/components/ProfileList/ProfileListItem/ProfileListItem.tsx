import React from "react";
import { transformProfileItem } from "./transformProfileItem";
import { extractProfileEntry } from "./extractProfileEntry";
import NextLink from "next/link";
import { ClickableTile } from "carbon-components-react";
import { ArrowRight24 } from "@carbon/icons-react";
import { ProfileEntry } from "@/modules/profile/client/components/ProfileEntry";
import { IProfileItem } from ".";

export const ProfileListItem = (props: IProfileItem) => {
  const {
    profile,
    midwifeLabel,
    servicesHeadline,
    route,
    profileType,
  } = transformProfileItem(props);
  return (
    <NextLink href={route ?? "#"} passHref>
      <ClickableTile href={route} className={profileType ?? ""}>
        <ProfileEntry
          {...extractProfileEntry(profile, midwifeLabel, servicesHeadline)}
          // isTitleAsLink={true}
          isNarrow={false}
          key={route}
        />
        <ArrowRight24 />
      </ClickableTile>
    </NextLink>
  );
};
