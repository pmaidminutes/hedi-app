import { ITyped } from "@/modules/model";
import { ILogin } from "./transformLogin";
import { Login } from "./Login";
import { IPage } from "@/modules/page/types";



export interface ILoginNew extends IPage {}

export const TryLoginNew = ({ content }: { content: ITyped }): JSX.Element | null =>
  content.type === "LoginNew" ? (
    <Login  content={content as ILogin} />
  ) : null;
