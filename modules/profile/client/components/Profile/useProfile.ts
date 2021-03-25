import { useState, useEffect } from "react";
import { getTextInputProps, tryGetValue } from "@/modules/common/utils";
import { ProfileView } from "@/modules/profile/query";
import { isICaregiver, isIMidwife } from "../../../types";
export interface IProfileViewProps {
  content: ProfileView;
}

export function useProfile(props: IProfileViewProps) {
  const { content } = props;
  const [hasServices, setHasServices] = useState(true);
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

  useEffect(() => {
    setHasServices(services.length > 0 ? true : false);
  }, [services]);

  // HACK proper domain impl
  const domainMidwife = tryGetValue("midwife_label", elements, "Hebamme");
  const domains = isICaregiver(content)
    ? content.domains
    : [{ type: "Domain", label: domainMidwife, route: "/" + domainMidwife }];

  return {
    languagesData: {
      languageSkills,
      headline: languagesHeadline,
    },
    profileEntryData: {
      displayName,
      domains,
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
    hasServices,
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
