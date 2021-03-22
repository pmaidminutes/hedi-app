import { Row, Column } from "carbon-components-react";
import { useProfileEntry, IProfileEntryProps } from "./useProfileEntry";

export const ProfileEntry = (props: IProfileEntryProps): JSX.Element => {
  const {
    displayName,
    postal_code,
    city,
    mail,
    website,
    phone,
  } = useProfileEntry(props);

  return (
    <>
      <section className="hedi--profile-entry">
        <Row>
          <Column lg={{ span: 4, offset: 1 }}>
            {/* TODO image dynamisch */}
            <img src="/images/profile_dummy.png" alt="Profil Bild" style={{}} />
          </Column>
          <Column lg={10}>
            <h2>{displayName}</h2>
            {/* TODO subtitle? */}
            <h3>psychosoziale Beratung</h3>
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
          </Column>
        </Row>
      </section>
    </>
  );
};
[];
