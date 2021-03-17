import { EditProfileForm } from "./EditProfileForm";
import { useEditProfileForm } from "./useEditProfileForm";

type EditProfileProps = {
  infoLabels: { [key: string]: string };
  lang: string;
};

export const EditProfile = ({ infoLabels, lang }: EditProfileProps) => {
  return <EditProfileForm infoLabels={infoLabels} {...useEditProfileForm()} />;
};
