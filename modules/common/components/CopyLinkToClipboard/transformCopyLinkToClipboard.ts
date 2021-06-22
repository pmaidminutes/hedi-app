import { Link32, Link24, Link16 } from "@carbon/icons-react";
export interface ICopyLinkToClipboard {
  link: string;
  id?: string;
  type?: "icon" | "button";
  size?: CopyToClipboarSize;
}

export type CopyToClipboarSize = "sm" | "md" | "lg";

export function transformCopyLinkToClipboard(props: ICopyLinkToClipboard) {
  const { link, id, type, size } = props;
  const transformedLink = `${link}${id ? `#${id}` : ""}`;

  return { transformedLink, type: type || "button", size: size || "lg" };
}
