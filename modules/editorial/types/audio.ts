import { FileFields, IFile } from "@/modules/model/IFile";

export interface IAudio extends IFile {}

export const AudioGQL = `... on Audio {${FileFields}}`;
