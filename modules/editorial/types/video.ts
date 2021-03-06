import { FileFields, IFile } from "@/modules/model/IFile";

export interface IVideo extends IFile {}

export const VideoGQL = `... on Video {${FileFields}}`;
