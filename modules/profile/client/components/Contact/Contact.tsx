import { IContact, IProfile } from "@/modules/model";
import { Tile } from "carbon-components-react";
interface IContactProps {
  content: IProfile;
}

export const Contact = ({ content }: IContactProps): JSX.Element => {
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
  } = content;
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
        {/* TODO headline aus Appages */}
        <h3>Sprechzeiten</h3>
        {consultation_hours ? <p>{consultation_hours}</p> : null}
      </Tile>
    </section>
  );
};
