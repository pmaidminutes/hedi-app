import { ITyped } from "@/modules/model";
import { IViewProfile } from "../types";
import { ViewProfile } from "./ViewProfile";

export const TryViewProfile = (content: ITyped): JSX.Element | null =>
  content.type === "ViewProfile" ? (
    <ViewProfile content={content as IViewProfile} />
  ) : null;
