import { getUser } from "@/modules/auth/client";
import { IEditProfileView } from "../types";
import { EditProfileForm } from "./EditProfileForm";
import { useEditProfileForm } from "./useEditProfileForm";

export const EditProfile = ({ content }: { content: IEditProfileView }) => {
  const [user] = getUser();
  if (!user) return null; //TODO senseful redirect

  const main = content.elements;
  const Parent =
    content.children.find(ap => ap.key === "editprofile_Parent")?.elements ??
    [];
  const Caregiver =
    content.children.find(ap => ap.key === "editprofile_Caregiver")?.elements ??
    [];
  const Midwife =
    content.children.find(ap => ap.key === "editprofile_Midwife")?.elements ??
    [];

  return (
    <EditProfileForm
      uiElementMap={{ main, Parent, Caregiver, Midwife }}
      {...useEditProfileForm()}
    />
  );
};
