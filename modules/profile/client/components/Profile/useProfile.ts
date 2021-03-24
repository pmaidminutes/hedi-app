import { useState } from "react";
import { getTextInputProps } from "@/modules/common/utils";
import { ProfileView } from "@/modules/profile/query";
import { isICaregiver, isIMidwife } from "../../../types";
export interface IProfileViewProps {
  content: ProfileView;
}

export function useProfile(props: IProfileViewProps) {
  const { content } = props;
  console.log({ content });
  const {
    languageSkills,
    elements,
    displayName,
    postal_code,
    city,
    mail,
    website,
    phone,
    consultation_hours,
    street,
    house_number,
    displayAddress,
    lat,
    long,
    services,
  } = content;
  const languagesHeadline = getTextInputProps("fluency", elements);
  const servicesHeadline = getTextInputProps("services", elements);
  const contactHeadline = getTextInputProps("office_hrs", elements);
  const relatedHeadline = getTextInputProps("linked_profile", elements);

  return {
    languagesData: {
      languageSkills,
      headline: languagesHeadline,
    },
    profileEntryData: {
      displayName,
      postal_code,
      city,
      mail,
      website,
      phone,
    },
    servicesData: {
      headline: servicesHeadline,
      services,
    },
    contactData: {
      headline: contactHeadline,
      phone,
      mail,
      website,
      consultation_hours,
      street,
      house_number,
      city,
      displayAddress,
      postal_code,
    },
    relatedProfilesData: {
      headline: relatedHeadline,
    },
    mapData: {
      currentLocation: {
        lat,
        long,
        displayName,
      },
      // TODO: handling associates
      locations: [{ lat, long, displayName }],
    },
  };
}
