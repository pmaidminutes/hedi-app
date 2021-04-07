import { ITyped } from "@/modules/model";
import { IEditProfileView } from "../../types";
import { EditProfile } from "./EditProfile";

// UNUSED
export const TryEditProfile = (content: ITyped): JSX.Element | null =>
  content.type === "EditProfile" ? (
    <EditProfile content={content as IEditProfileView} />
  ) : null;
