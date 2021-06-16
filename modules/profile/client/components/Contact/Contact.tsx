import { Tile } from "carbon-components-react";
import PregnantWoman from "./assets/pregnant.svg";
import { Seperator } from "@/modules/common/components";
import { IDataKind } from "@/modules/profile/types/taxonomyTypes";
import {
  IAddress,
  IConsultationHour,
  IEmail,
  IPhone,
  IWebsite,
} from "@/modules/profile/types/dataTypes";
import { Address, PhoneLink, EmailLink, WebLink } from "..";
import { ConsultationHours } from "../ConsultationHours";

export interface IContact {
  dataKind: IDataKind;
  address?: IAddress;
  phone?: IPhone;
  email?: IEmail;
  website?: IWebsite;
  consultationHours?: IConsultationHour[];
}

export interface IContactDefinition {
  phoneTitle: string;
  emailTitle: string;
  websiteTitle: string;
  consultationHoursHeadline: string;
}

export type IContactProps = IContact & IContactDefinition;

export const Contact = (props: IContactProps): JSX.Element => {
  const { dataKind, address, phone, email, website, consultationHours } = props;
  const {
    phoneTitle,
    emailTitle,
    websiteTitle,
    consultationHoursHeadline,
  } = props;
  return (
    <section className="hedi--profile-contact hedi--profile--tile">
      <Tile>
        {/* TODO Inline SVG */}
        {/* <PregnantWoman /> */}
        <h3>{dataKind.label}</h3>
        {address && <Address {...address} />}
        <p>{phone && <PhoneLink title={phoneTitle} {...phone} />}</p>
        <p>{email && <EmailLink title={emailTitle} {...email} />}</p>
        <p>{website && <WebLink title={websiteTitle} {...website} />}</p>

        {consultationHours && (
          <>
            <Seperator />

            <ConsultationHours
              headline={consultationHoursHeadline}
              consultationHours={consultationHours}
            />
          </>
        )}
      </Tile>
    </section>
  );
};
