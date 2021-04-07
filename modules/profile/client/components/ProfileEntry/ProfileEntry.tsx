import { Row, Column, Link, Button } from "carbon-components-react";
import { TagList } from "@/modules/common/components";
import {
  transformProfileEntry,
  IProfileEntryProps,
} from "./transformProfileEntry";
import { Launch16, Edit24 } from "@carbon/icons-react";
import HediPerson from "./assets/hedi_person.svg";

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
    prettyUrl,
    phoneLink,
    editButtonProps,
  } = transformProfileEntry(props);

  return (
    <>
      <section className={className}>
        <Row narrow={isNarrow}>
          <Column sm={4} md={2} lg={3} className="hedi--profile-entry-image">
            <HediPerson />
          </Column>
          <Column sm={4} md={6} lg={13}>
            <div className="hedi--profile-entry-content">
              {/* TODO reuse contact */}
              <h2>{displayName}</h2>
              <h3>
                {domains?.map((domain, index) => (
                  <>
                    <span key={domain.label + index}>{domain.label}</span>
                    {domains.length > index + 1 ? (
                      <span className="hedi--ampersand">
                        {" "}
                        & <br />
                      </span>
                    ) : null}
                  </>
                ))}
              </h3>
              <address>
                {postal_code} {city}
                {/* TODO right number for phone linking */}
              </address>

              <div className="hedi--spacing">
                <p>
                  <Link
                    href={`tel:${phoneLink}`}
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
                      {prettyUrl} <Launch16 />
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
        {editButtonProps?.isShowing ? (
          <Button
            kind="ghost"
            size="sm"
            renderIcon={Edit24}
            href={editButtonProps.link}>
            {editButtonProps.text}
          </Button>
        ) : null}
      </section>
    </>
  );
};
[];
