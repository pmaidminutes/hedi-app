import { IContactProps, useContact } from "./useContact";
import { Tile } from "carbon-components-react";

export const Contact = (props: IContactProps): JSX.Element => {
  const {
    phone,
    mail,
    website,
    consultation_hours,
    street,
    house_number,
    city,
    displayAddress,
    postal_code,
    headline,
  } = useContact(props);
  return (
    <section className="hedi--profile-contact hedi--profile--tile">
      <Tile>
        <img src="/images/profile_pregnancy.svg" alt="" />
        <address>
          <p>{displayAddress}</p>
          <p>
            {street} {house_number}
          </p>
          <p>
            {postal_code} {city}
          </p>
        </address>
        {/* TODO right number for phone linking */}
        <p>
          <a href={`tel:${phone}`} target="_blank" title="Telefonnummer">
            {phone}
          </a>
        </p>
        <p>
          <a href={`mailto:${mail}`} target="_blank" title="E-Mail Address">
            {mail}
          </a>
        </p>
        <p>
          <a href={website} target="_blank" title="Webseite">
            {website}
          </a>
        </p>
        {consultation_hours ? (
          <>
            <h3>{headline}</h3>
            <p>{consultation_hours}</p>
          </>
        ) : null}
      </Tile>
    </section>
  );
};
