import { IAppPage } from "@/modules/common/types";
import { ITyped } from "@/modules/model";
import { LoginView } from "./LoginView";

export const TryLogin = (content: ITyped): JSX.Element | null =>
  content.type === "Login" ? <LoginView content={content as IAppPage} /> : null;
