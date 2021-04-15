import { ITyped } from "@/modules/model";
import { ILoginView } from "../../types";
import { LoginView } from "./LoginView";

export const TryLogin = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "Login" ? (
    <LoginView content={content as ILoginView} />
  ) : null;
