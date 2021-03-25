import { getUser } from "@/modules/auth/client";
import { extractConfig, IEditProfileView } from "../../types";
import { EditProfileForm, useEditProfileForm } from "../EditProfileForm";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { useRouter } from "next/router";
import { AssertClientSide } from "@/modules/common/utils";

export const EditProfile = ({ content }: { content: IEditProfileView }) => {
  const [user, loading] = getUser();
  if (!user) {
    if (AssertClientSide() && !loading) {
      const router = useRouter();
      router.push("/" + router.locale);
    }
    return null; //todo render something
  }

  const config = extractConfig(content);
  const editFormProps = useEditProfileForm(content.lang, user?.name);
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
