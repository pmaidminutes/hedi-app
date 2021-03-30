import { useState, useEffect } from "react";
import { getTextInputProps, tryGetValue } from "@/modules/common/utils";
import { ProfileView } from "@/modules/profile/query";
import { isICaregiver, isIMidwife } from "../../../types";
import { useCurrentProfileEntity } from "../../hooks";
import { getUser } from "@/modules/auth/client";
export interface IProfileViewProps {
  content: ProfileView;
}

export function useProfile(props: IProfileViewProps) {
  const { content } = props;
  const [hasServices, setHasServices] = useState(true);
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
    // lat,
    // long,
    services,
    lang,
    route,
  } = content;
  const [user, userIsLoading] = getUser();
  const [currentProfile, currentProfileLoading] = useCurrentProfileEntity(
    user,
    lang
  );
  const [hasEditProfileBtn, setHasEditProfileBtn] = useState(false);
  const languagesHeadline = getTextInputProps("fluency", elements);
  const servicesHeadline = getTextInputProps("services", elements);
  const contactHeadline = getTextInputProps("contact", elements);
  const officeHrsHeadline = getTextInputProps("office_hrs", elements);
  const relatedHeadline = getTextInputProps("linked_profile", elements);
  const editBtnText = tryGetValue("edit_button", elements);
  const editProfileLink = "/" + lang + "/user/profile/edit";

  useEffect(() => {
    setHasEditProfileBtn(
      !currentProfileLoading &&
        !userIsLoading &&
        currentProfile &&
        currentProfile.route == route
        ? true
        : false
    );
  }, [currentProfile, currentProfileLoading, userIsLoading, route]);

  const editButtonProps = {
    text: editBtnText,
    link: editProfileLink,
    isShowing: hasEditProfileBtn,
  };

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
      editButtonProps,
    },
    servicesData: {
      headline: servicesHeadline,
      services,
    },
    contactData: {
      headline: contactHeadline,
      officeHrsHeadline,
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
    // mapData: { HACK currently incompatible
    //   currentLocation: {
    //     lat,
    //     long,
    //     displayName,
    //   },
    //   // TODO: handling associates
    //   locations: [{ lat, long, displayName }],
    // },
  };
}
