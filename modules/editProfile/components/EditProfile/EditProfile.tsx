import { getUser } from "@/modules/auth/client";
import { extractConfig, IEditProfileView } from "../../types";
import { EditProfileForm, useEditProfileForm } from "../EditProfileForm";
import { SimplePageView } from "@/modules/simplePage/client/components";

export const EditProfile = ({ content }: { content: IEditProfileView }) => {
  const [user] = getUser();
  if (!user) return null; //TODO senseful redirect

  return (
    <SimplePageView content={content}>
      <EditProfileForm
        className="hedi--edit-profile"
        config={extractConfig(content)}
        {...useEditProfileForm(content.lang)}
      />
    </SimplePageView>
  );
};
