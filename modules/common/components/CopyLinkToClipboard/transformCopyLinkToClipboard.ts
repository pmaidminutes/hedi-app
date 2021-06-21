export interface ICopyLinkToClipboard {
  link: string;
  id?: string;
}

export function transformCopyLinkToClipboard(props: ICopyLinkToClipboard) {
  const { link, id } = props;
  const transformedLink = `${link}${id ? `#${id}` : ""}`;

  return { transformedLink };
}
