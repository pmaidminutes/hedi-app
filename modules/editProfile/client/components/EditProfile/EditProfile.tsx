import { getUser } from "@/modules/auth/client";
import { extractConfig, IEditProfileView } from "../../../types";
import { EditProfileForm, useEditProfileForm } from "../EditProfileForm";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { useEffect, useState } from "react";

export const EditProfile = ({ content }: { content: IEditProfileView }) => {
  const [user, loading] = getUser();

  const [config, setConfig] = useState(extractConfig(content));
  useEffect(() => {
    setConfig(extractConfig(content));
  }, [content.lang]);

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
