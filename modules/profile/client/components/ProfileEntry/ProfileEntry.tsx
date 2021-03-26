import { Row, Column, Link } from "carbon-components-react";
import { TagList } from "@/modules/common/components";
import { useProfileEntry, IProfileEntryProps } from "./useProfileEntry";
import { Launch16 } from "@carbon/icons-react";

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
    route,
    isNarrow,
    className,
  } = useProfileEntry(props);

  return (
    <>
      <section className={className}>
        <Row narrow={isNarrow}>
          <Column sm={4} md={2} lg={3} className="hedi--profile-entry-image">
            {/* TODO image dynamisch */}
            <img
              src="/images/Profile_Person_grey70.svg"
              alt="Profil Bild"
              style={{}}
            />
          </Column>
          <Column sm={4} md={6} lg={13}>
            <div className="hedi--profile-entry-content">
              {/* TODO reuse contact */}
              <h2>{displayName}</h2>
              <h3>
                {domains?.map((domain, index) => {
                  console.log(index, domains.length);
                  return (
                    <>
                      <span>{domain.label}</span>
                      {domains.length > index + 1 ? (
                        <span className="hedi--ampersand">
                          {" "}
                          & <br />
                        </span>
                      ) : null}
                    </>
                  );
                })}
              </h3>
              <address>
                {postal_code} {city}
                {/* TODO right number for phone linking */}
              </address>

              <div className="hedi--spacing">
                <p>
                  <Link
                    href={`tel:${phone}`}
                    target="_blank"
                    title="Telefonnummer"
                    className="bx--link--lg">
                    {phone}
                  </Link>
                </p>
                <p>
                  <Link
                    href={`mailto:${mail}`}
                    target="_blank"
                    title="E-Mail Address"
                    className="bx--link--lg"
                    inline>
                    {mail}
                  </Link>
                </p>
                <p>
                  {website ? (
                    <Link
                      href={website}
                      target="_blank"
                      title="Webseite"
                      className="bx--link--lg">
                      {website} <Launch16></Launch16>
                    </Link>
                  ) : null}
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
