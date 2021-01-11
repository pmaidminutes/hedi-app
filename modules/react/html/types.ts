import { HTMLAttributes, ReactNode } from "react";

export interface ITransformCallbackMap {
  [name: string]: ParseInfoTransformFn;
}

export interface IParserElementInfo {
  name: string;
  start: number;
  end: number;
  children: IParserElementInfo[];
  transform: ParseInfoTransformFn;
  attributes?: IParserAttributeInfo;
  needsTransform?: boolean;
}

export type ParseInfoTransformFn = (
  htmlString: string,
  info: IParserElementInfo,
  props?: HTMLAttributes<any>
) => ReactNode;

export interface IParserAttributeInfo {
  [key: string]: string;
}
