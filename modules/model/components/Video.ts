import { HTML, IComponent } from "./Component";

export type VideoKind = "Video";

export interface Video extends IComponent {
  kind: VideoKind;
  route: string;
  labelText: HTML;
  usage?: string;
}

export const isVideo = (obj: IComponent): obj is Video =>
  obj?.id === typeof "string" && obj?.kind === "Video";

export const isVideoInstance = (obj: IComponent, id: string): obj is Video =>
  isVideo(obj) && obj.id === id;
