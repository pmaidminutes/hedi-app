import { IContactProps, useContact } from "./useContact";
import { Tile, Link } from "carbon-components-react";
import { Launch16 } from "@carbon/icons-react";
import PregnantWoman from "./assets/pregnant.svg";

export const Contact = (props: IContactProps): JSX.Element => {
  const {
    phone,
    mail,
    website,
    consultation_hours,
    street,
    house_number,
    city,
    postal_code,
    headline,
    officeHrsHeadline,
  } = useContact(props);
  return (
    <section className="hedi--profile-contact hedi--profile--tile">
      <Tile>
        <h2>{headline}</h2>
        <PregnantWoman />
        <address>
          <p>
            {street} {house_number}
          </p>
          <p>
            {postal_code} {city}
          </p>
        </address>
        {/* TODO right number for phone linking */}

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
        <div className="hedi--consultation-hours-wrapper">
          {consultation_hours ? (
            <>
              <h3>{officeHrsHeadline}</h3>
              <pre>{consultation_hours}</pre>
            </>
          ) : null}
        </div>
      </Tile>
    </section>
  );
};
