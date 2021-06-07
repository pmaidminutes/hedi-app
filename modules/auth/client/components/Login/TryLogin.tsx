import { ITyped } from "@/modules/model";
import { Login } from "./Login"
import { ILogin } from "../../../types";

export const TryLogin = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "Login" ? <Login content={content as ILogin} /> : null;
