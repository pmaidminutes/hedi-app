import { IContactProps, useContact } from "./useContact";
import { Tile, Link } from "carbon-components-react";
import { Launch16 } from "@carbon/icons-react";

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
    phoneLink,
    prettyUrl,
  } = useContact(props);
  return (
    <section className="hedi--profile-contact hedi--profile--tile">
      <Tile>
        <img src="/images/Pregnancy_pink80.svg" alt="" />
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
              {prettyUrl}
              <Launch16 />
            </Link>
          ) : null}
        </p>
        <div className="hedi--consultation-hours-wrapper">
          {consultation_hours ? (
            <>
              <h3>{headline}</h3>
              <p>{consultation_hours}</p>
            </>
          ) : null}
        </div>
      </Tile>
    </section>
  );
};
