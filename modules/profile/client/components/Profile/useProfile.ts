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
  } = content;
  const languagesHeadline = getTextInputProps("fluency", elements);
  const servicesHeadline = getTextInputProps("services", elements);

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
  };
}
