import camelcase from "camelcase";
import { CSSProperties, HTMLAttributes } from "react";
import { StringProperties } from "@/modules/model";

export const attributesToProps = (attributes?: IParserAttributeInfo) => {
  if (!attributes) return attributes;
  const { class: className, style, ...rest } = attributes;
  let result: HTMLAttributes<any> = rest;
  if (className) result.className = className;
  if (style) result.style = parseCSSProperties(style);
  return result;
};

export const parseCSSProperties = (text: string): CSSProperties | undefined => {
  if (!text || text === "") return undefined;

  let result: StringProperties = {};
  for (const rule of text.split(";")) {
    if (rule) {
      const [k, v] = rule.split(":");
      const key = camelcase(k.trim());
      result[key] = v.trim();
    }
  }
  return result;
};
