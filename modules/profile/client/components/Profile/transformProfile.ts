import {
  getUIElementValue,
  transformStringToUrl,
  getTextInputProps,
} from "@/modules/common/utils";
import { isICaregiver } from "../../../types";

import { ProfileView } from "@/modules/profile/query";
export interface IProfileViewProps {
  content: ProfileView;
}

export function transformProfile(props: IProfileViewProps) {
  const { content } = props;
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
    services,
    lang,
    route,
  } = content;

  const fakeRelatedProfiles = [
    getTextInputProps("fake_related_1", elements),
    getTextInputProps("fake_related_2", elements),
  ];

  // HACK proper domain impl
  const domainMidwife = getUIElementValue(
    "domain_midwife",
    elements,
    "Hebamme"
  );
  const domains = isICaregiver(content)
    ? content.domains
    : [{ type: "Domain", label: domainMidwife, route: "/" + domainMidwife }];

  return {
    languagesData: {
      languageSkills,
    },
    profileEntryData: {
      displayName,
      domains,
      postal_code,
      city,
      mail,
      website: transformStringToUrl(website),
      phone,
    },
    servicesData: {
      services,
    },
    contactData: {
      phone,
      mail,
      website: transformStringToUrl(website),
      consultation_hours,
      street,
      house_number,
      city,
      displayAddress,
      postal_code,
    },
    relatedProfilesData: {
      profiles: fakeRelatedProfiles,
    },
    lang,
    route,
    elements,
    services,
  };
}