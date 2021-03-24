import { AspectRatio, Column, Grid, Row } from "carbon-components-react";
import Image from "next/image";
import { HTMLWithNextImage } from "@/modules/react/html";
import { ITyped } from "@/modules/model";
import { ProfileListView } from "@/modules/profile/query";
import { ProfileEntry } from "@/modules/profile/client/components/ProfileEntry";
import { isICaregiver, isIMidwife, Profile } from "@/modules/profile/types";
import { tryGetValue } from "@/modules/common/utils";

export const TryProfileList = (content: ITyped): JSX.Element | null => {
  if (content.type !== "ProfileList") return null;
  return <ProfileList content={content as ProfileListView} />;
};

const extractProfileEntry = (
  profile: Profile,
  midwifeLabel: string,
  servicesHeadline: string
) => {
  const {
    displayName,
    postal_code,
    city,
    mail,
    website,
    phone,
    services,
  } = profile;
  const domainMidwife = {
    type: "Domain",
    label: midwifeLabel,
    route: "/" + midwifeLabel,
  };
  const domains = isICaregiver(profile)
    ? profile.domains
    : isIMidwife(profile)
    ? [domainMidwife]
    : undefined;
  return {
    displayName,
    postal_code,
    city,
    mail,
    website,
    phone,
    services,
    servicesHeadline,
    domains,
  };
};

export const ProfileList = ({ content }: { content: ProfileListView }) => {
  const midwifeLabel = tryGetValue(
    "midwife_label",
    content.elements,
    "Hebamme"
  );
  const servicesHeadline = tryGetValue(
    "services",
    content.elements,
    "Tätigkeiten"
  );
  return (
    <div className={`hedi--profile-list`}>
      {content.posterImage && (
        <AspectRatio ratio="2x1">
          <Image
            src={content.posterImage.route}
            alt={content.posterImage.alt}
            className="hedi-header-image"
            width={content.posterImage.width}
            height={content.posterImage.height}
          />
        </AspectRatio>
      )}
      <Grid>
        <Row>
          <Column>
            <h1>{content.longTitle ?? content.label}</h1>
            <HTMLWithNextImage data={content.body} />
          </Column>
        </Row>
        {content.profiles.map(profile => (
          <Row>
            <ProfileEntry
              {...extractProfileEntry(profile, midwifeLabel, servicesHeadline)}
              key={profile.route}
            />
          </Row>
        ))}
      </Grid>
    </div>
  );
};
