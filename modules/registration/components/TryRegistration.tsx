import { ITyped } from "@/modules/model";
import { IRegistrationView } from "../types";
import { RegistrationView } from "./RegistrationView/RegistrationView";

export const TryRegistration = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "Registration" ? (
    <RegistrationView content={content as IRegistrationView} />
  ) : null;
