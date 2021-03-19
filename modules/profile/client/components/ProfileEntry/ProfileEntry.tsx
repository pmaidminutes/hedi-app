import { IProfile } from "@/modules/model/IProfile";
import { ClickableTile, Row, Column } from "carbon-components-react";
import Link from "next/link";
import {
  ICaregiver,
  IInstitution,
  IMidwife,
  IOrganisation,
} from "../../../types";

export const ProfileEntry = ({
  profile,
}: {
  profile: IProfile | IMidwife | ICaregiver | IOrganisation | IInstitution;
}): JSX.Element => {
  console.log({ profile });
  const {
    displayName,
    postal_code,
    city,
    mail,
    website,
    phone,
  } = profile;

  return (
    <>

      <section className="hedi__profile-entry">
        <Row>
          <Column lg={{ span: 4, offset: 1 }}>
            <img
              src="/images/profile_dummy.png"
              alt="Profil Bild"
              style={{

              }}
            />
          </Column>
          <Column lg={10}>
            <h2>{displayName}</h2>
            <h3>psychosoziale Beratung</h3>
            <address style={{}}>
              <p>
                {postal_code} {city}
              </p>
              {/* TODO right number for phone linking */}
              <a href={`tel:${phone}`}  target="_blank" title="Telefonnummer">
                {phone}
              </a>
              <a href={`mailto:${mail}`} target="_blank" title="E-Mail Address">
                {mail}
              </a>
              <a href={website} target="_blank" title="Webseite">
                {website}
              </a>
            </address>
          </Column>
        </Row>
      </section>
    </>
  );
};
[];
