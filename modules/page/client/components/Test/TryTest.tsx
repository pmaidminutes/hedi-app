import { ITyped } from "@/modules/model";
import { IPage } from "@/modules/page/types";
import { Test } from "./Test";

export interface ITest extends IPage {}

export const TryTest = ({ content }: { content: ITyped }): JSX.Element | null =>
  content.type === "Test" ? (
    <Test content={content as ITest} />
  ) : null;
