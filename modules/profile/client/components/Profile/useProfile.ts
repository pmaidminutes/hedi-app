import { getTextInputProps } from "@/modules/common/utils";
import { ProfileView } from "@/modules/profile/query";
export interface IProfileViewProps {
  content: ProfileView;
}

export function useProfile(props: IProfileViewProps) {
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
  } = content;
  const languagesHeadline = getTextInputProps("fluency", elements);
  const servicesHeadline = getTextInputProps("services", elements);
  const contactHeadline = getTextInputProps("office_hrs", elements);

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
  };
}
