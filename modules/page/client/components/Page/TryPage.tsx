import { ITyped } from "@/modules/model";
import { IPage } from "../../../types";
import { Page } from "./Page";

export const TryPage = ({ content }: { content: ITyped }): JSX.Element | null =>
  content.type === "Page" ? <Page content={content as IPage} /> : null;
