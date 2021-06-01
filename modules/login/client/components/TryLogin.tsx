import { ITyped } from "@/modules/model";
import { Login, ILogin } from "./Login";

export const TryLogin = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "Login" ? <Login content={content as ILogin} /> : null;
