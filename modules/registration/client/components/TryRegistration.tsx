import { ITyped } from "@/modules/model";
import { IRegistration } from "../../types";
import { Registration } from "./Registration";

export const TryRegistration = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "Registration" ? (
    <Registration content={content as IRegistration} />
  ) : null;
