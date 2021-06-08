import { IFileComponent } from "../../../types";
import { HTML } from "@/modules/react/html/HTML";

export interface IDownloadFileProps extends IFileComponent {}

export function transformDownloadFile(props: IDownloadFileProps) {
  const { labelText, mimeType, route } = props;

  return {
    href: process.env.NEXT_PUBLIC_ASSETS_URL + route,
    text: HTML({data:labelText}),
    mimeType,
  };
}
