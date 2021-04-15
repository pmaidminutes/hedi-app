import { ITyped } from "@/modules/model";
import { IEditProfileView } from "../../types";
import { EditProfileView } from "./EditProfileView";

export const TryEditProfile = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "EditProfile" ? (
    <EditProfileView content={content as IEditProfileView} />
  ) : null;
