import { HTML, IComponent } from "./Component";

export type AudioKind = "Audio";

export interface Audio extends IComponent {
  kind: AudioKind;
  route: string;
  labelText: HTML;
  usage?: string;
}

export const isAudio = (obj: IComponent): obj is Audio =>
  obj?.id === typeof "string" && obj?.kind === "Audio";

export const isAudioInstance = (obj: IComponent, id: string): obj is Audio =>
  isAudio(obj) && obj.id === id;
