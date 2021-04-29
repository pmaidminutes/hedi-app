import { MediaInputType } from "../types";
import pathUtils from "path";

export const rawStringToBuffer = (str: string) => {
  let length = str.length,
    arr = new Array(length);
  for (let pos = 0; pos < length; pos++) {
    arr[pos] = str.charCodeAt(pos) & 0xff;
  }
  return new Uint8Array(arr);
};

export const convertBufferToString = (buffer: Buffer): string => {
  const contentChars = new Array(buffer.length);
  buffer.forEach((byte, index) => {
    contentChars[index] = String.fromCharCode(byte);
  });
  return contentChars.join("");
};

export const getMediaType = (filename: string): MediaInputType => {
  const mediatypeExtensions = [
    { mediatype: "file", extensions: ["pdf", "doc", "docx", "xls", "xlsx"] },
    { mediatype: "audio", extensions: ["mp3", "ogg", "aac", "wav"] },
    {
      mediatype: "video",
      extensions: ["mov", "wmv", "webm", "mkv", "avi", "flv", "mp4"],
    },
    { mediatype: "image", extensions: ["png", "jpg", "jpeg", "webp", "gif"] },
    { mediatype: "svg", extensions: ["svg"] },
  ];
  const extension = pathUtils.extname(filename).substr(1); // TODO what if the file has no extension
  const mediatype = mediatypeExtensions.find(group =>
    group.extensions.includes(extension)
  )?.mediatype as MediaInputType;
  return mediatype ?? "file";
};
