import { IAppPage } from "@/modules/common/types";
import { ITyped } from "@/modules/model";
import { ILoginView } from "../../types";
import { LoginView } from "./LoginView";

export const TryLogin = (content: ITyped): JSX.Element | null =>
  content.type === "Login" ? (
    <LoginView content={content as ILoginView} />
  ) : null;
