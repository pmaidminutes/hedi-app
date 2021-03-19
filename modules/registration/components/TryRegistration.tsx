import { ITyped } from "@/modules/model";
import { IRegistrationView } from "../types";
import { Registration } from "./Registration";

export const TryRegistration = (content: ITyped): JSX.Element | null =>
  content.type === "Registration" ? (
    <Registration content={content as IRegistrationView} />
  ) : null;
