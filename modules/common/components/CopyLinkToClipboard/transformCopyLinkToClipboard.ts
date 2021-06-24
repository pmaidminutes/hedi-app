export interface ICopyLinkToClipboard {
  route?: string;
  id?: string;
  type?: "icon" | "button";
  size?: CopyToClipboarSize;
}

export type CopyToClipboarSize = "sm" | "md" | "lg";

export function transformCopyLinkToClipboard(props: ICopyLinkToClipboard) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const { route, id, type, size } = props;
  const transformedLink = `${baseUrl}${route || ""}${
    route && id ? `#${id}` : ""
  }`;

  return { transformedLink, type: type || "button", size: size || "lg" };
}
