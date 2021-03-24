import { Row, Column, AspectRatio } from "carbon-components-react";
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
  console.log({ services });
  const className =
    "hedi--profile-entry" +
    (services ? " hedi--profile-entry--with-services" : "");
  return (
    <>
      <section className={className}>
        <Row>
          <Column sm={4} md={2} lg={3} className="hedi--profile-entry-image">
            {/* TODO image dynamisch */}
            <img src="/images/Profilbild_bw.png" alt="Profil Bild" style={{}} />
          </Column>
          <Column sm={4} md={6} lg={10}>
            <div className="hedi--profile-entry-content">
              {/* TODO reuse contact */}
              <h2>{displayName}</h2>
              <h3>{domains?.map(d => d.label).join(" & ")}</h3>
              <address>
                {postal_code} {city}
                {/* TODO right number for phone linking */}
              </address>

              <div className="hedi--spacing">
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
              </div>
              {services && services.length > 0 && (
                <TagList
                  tagType="blue"
                  tags={services}
                  headline={servicesHeadline ?? "Tätigkeiten"}></TagList>
              )}
            </div>
          </Column>
        </Row>
      </section>
    </>
  );
};
[];
