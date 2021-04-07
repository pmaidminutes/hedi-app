import { IContactProps, transformContact } from "./transformContact";
import { Tile, Link } from "carbon-components-react";
import { Launch16 } from "@carbon/icons-react";
import PregnantWoman from "./assets/pregnant.svg";
import { Seperator } from "@/modules/common/components";

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
    phoneLink,
    prettyUrl,
  } = transformContact(props);
  return (
    <section className="hedi--profile-contact hedi--profile--tile">
      <Tile>
        <PregnantWoman />
        <h3>{headline}</h3>
        <address>
          <p>
            {street} {house_number}
          </p>
          <p>
            {postal_code} {city}
          </p>
        </address>

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

        {consultation_hours ? (
          <>
            <Seperator />

            <div className="hedi--consultation-hours-wrapper">
              <h3>{officeHrsHeadline}</h3>
              <pre>{consultation_hours}</pre>
            </div>
          </>
        ) : null}
      </Tile>
    </section>
  );
};
