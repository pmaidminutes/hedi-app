import { HTML, IComponent } from "./Component";

export type AudioKind = "Audio";

export interface IAudioComponent extends IComponent {
  kind: AudioKind;
  route: string;
  labelText: HTML;
  usage?: string;
  mimeType?: string;
}

export const isAudio = (obj: IComponent): obj is IAudioComponent => obj?.kind === "Audio";

export const isAudioInstance = (obj: IComponent, id: string): obj is IAudioComponent =>
  isAudio(obj) && obj.id === id;

export const findAudioInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isAudio).find(item => item.id === id);
  return element;
};
