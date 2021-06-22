export interface ICopyLinkToClipboard {
  link: string;
  id?: string;
  type?: "icon" | "button";
}

export function transformCopyLinkToClipboard(props: ICopyLinkToClipboard) {
  const { link, id, type } = props;
  const transformedLink = `${link}${id ? `#${id}` : ""}`;

  return { transformedLink, type: type || "button" };
}
