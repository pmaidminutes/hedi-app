import { Row, Column } from "carbon-components-react";
import { TagList } from "@/modules/common/components";
import { useProfileEntry, IProfileEntryProps } from "./useProfileEntry";

export const ProfileEntry = (props: IProfileEntryProps): JSX.Element => {
  const {
    displayName,
    domains,
    postal_code,
    city,
    mail,
    website,
    phone,
    services,
    servicesHeadline,
  } = useProfileEntry(props);
  const className =
    "hedi--profile-entry" + services
      ? " hedi--profile-entry--with-services"
      : "";
  return (
    <>
      <section className={className}>
        <Row>
          <Column lg={{ span: 4, offset: 1 }}>
            {/* TODO image dynamisch */}
            <img src="/images/profile_dummy.png" alt="Profil Bild" style={{}} />
          </Column>
          <Column lg={10}>
            {/* TODO reuse contact */}
            <h2>{displayName}</h2>
            <h3>{domains?.map(d => d.label).join(" & ")}</h3>
            <address>
              {postal_code} {city}
              {/* TODO right number for phone linking */}
            </address>
            <p>
              <a href={`tel:${phone}`} target="_blank">
                {phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${mail}`} target="_blank">
                {mail}
              </a>
            </p>
            <p>
              <a href={website} target="_blank">
                {website}
              </a>
            </p>
            {services && (
              <TagList
                tags={services}
                headline={servicesHeadline ?? "Tätigkeiten"}></TagList>
            )}
          </Column>
        </Row>
      </section>
    </>
  );
};
[];
