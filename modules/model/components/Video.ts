import { HTML, IComponent } from "./Component";

export type VideoKind = "Video";

export interface Video extends IComponent {
  kind: VideoKind;
  route: string;
  labelText: HTML;
  usage?: string;
  mimeType?: string;
}

export const isVideo = (obj: IComponent): obj is Video => obj?.kind === "Video";

export const isVideoInstance = (obj: IComponent, id: string): obj is Video =>
  isVideo(obj) && obj.id === id;

export const findVideoInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isVideo).find(item => item.id === id);
  return element;
};
