import { Row, Column } from "carbon-components-react";
import { TagList } from "@/modules/common/components";

import HediPerson from "./assets/hedi_person.svg";
import { IProfileEntry } from "@/modules/profile/types";
import { Address, EmailLink, PhoneLink, WebLink } from "..";

export type IProfileEntryProps = IProfileEntry &
  IProfileEntryDefinition &
  IProfileEntryConfig;

export interface IProfileEntryDefinition {
  phoneTitle?: string;
  emailTitle?: string;
  websiteTitle?: string;
  servicesTitle?: string;
}

export interface IProfileEntryConfig {
  isNarrow?: boolean;
}

export const ProfileEntry: React.FC<IProfileEntryProps> = (
  props
): JSX.Element => {
  const { label, profession, address, phone, email, website, services } = props;
  const {
    phoneTitle,
    emailTitle,
    websiteTitle,
    servicesTitle,
    isNarrow,
  } = props;
  const className =
    "hedi--profile-entry" +
    (services ? " hedi--profile-entry--with-services" : "");
  return (
    <section className={className}>
      <Row narrow={isNarrow}>
        <Column sm={4} md={2} lg={3} className="hedi--profile-entry-image">
          <HediPerson />
        </Column>
        <Column sm={4} md={6} lg={13}>
          <div className="hedi--profile-entry-content">
            <h2>{label}</h2>
            {profession && <h3>{profession?.label}</h3>}
            <Address {...address} />

            <div className="hedi--spacing">
              {phone && (
                <p>
                  <PhoneLink title={phoneTitle ?? "Telephone"} {...phone} />
                </p>
              )}
              {email && (
                <p>
                  <EmailLink
                    title={emailTitle ?? "E-Mail Address"}
                    {...email}
                  />
                </p>
              )}
              {website && (
                <p>
                  <WebLink title={websiteTitle ?? "Webseite"} {...website} />
                </p>
              )}
            </div>
            {services && services.length > 0 && (
              <TagList
                tagType="blue"
                //tags={services}
                headline={servicesTitle ?? "Tätigkeiten"}></TagList>
            )}
          </div>
        </Column>
      </Row>
      {props.children}
    </section>
  );
};
