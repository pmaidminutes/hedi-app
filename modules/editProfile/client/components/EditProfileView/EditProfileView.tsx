import { getUser } from "@/modules/auth/client";
import { IEditProfileView } from "../../../types";
import { EditProfileForm, useEditProfileForm } from "../EditProfileForm";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { useConfig } from "./useConfig";

export const EditProfileView = ({ content }: { content: IEditProfileView }) => {
  const [user, isLoading] = getUser();
  const config = useConfig(content);

  const editFormProps = useEditProfileForm(
    content.lang,
    content.elements,
    user?.name
  );
  return (
    <SimplePageView content={content}>
      <EditProfileForm
        className="hedi--edit-profile"
        config={config}
        {...editFormProps}
      />
    </SimplePageView>
  );
};
