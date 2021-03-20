import { getUser } from "@/modules/auth/client";
import { extractConfig, IEditProfileView } from "../../types";
import { EditProfileForm, useEditProfileForm } from "../EditProfileForm";

export const EditProfile = ({ content }: { content: IEditProfileView }) => {
  const [user] = getUser();
  if (!user) return null; //TODO senseful redirect

  return (
    <EditProfileForm
      config={extractConfig(content)}
      {...useEditProfileForm()}
    />
  );
};
