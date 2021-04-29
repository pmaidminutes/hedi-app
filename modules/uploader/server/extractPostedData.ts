import { IncomingMessage } from "http";
import { convertBufferToString, rawStringToBuffer } from "./helpers";

export interface IUploadedFileInfo {
  content: Uint8Array;
  fieldname: string;
  originalname: string;
}

export interface ISavedFileInfo extends Omit<IUploadedFileInfo, "content"> {
  savedAsFilename?: string;
  error?: string;
}

interface IPartHeader {
  name: string;
  filename: string;
}

type ExtractedContent = { [key: string]: any } & {
  files?: IUploadedFileInfo[];
};

export const extractPostedData = async (
  req: IncomingMessage
): Promise<ExtractedContent> => {
  return new Promise<ExtractedContent>((resolve, reject) => {
    const buffer: any[] = [];
    const contentType = req.headers["content-type"] ?? "";

    req.on("data", chunk => buffer.push(chunk));
    req.on("end", () => {
      const buf = Buffer.concat(buffer);

      if (contentType.indexOf("multipart/form-data") != -1) {
        resolve(extractMultipart(buf, contentType));
      } else if (contentType.indexOf("www-x-form-urlencoded") != -1) {
        resolve(extractWwwForm(buf));
      } else {
        reject("not supported content-type");
      }
    });
    req.on("error", err => reject(err));
  });
};

const extractMultipart = (
  bodyBuffer: Buffer,
  contentType: string
): ExtractedContent => {
  const result: ExtractedContent = {};

  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);

  if (!boundaryMatch) {
    throw new Error("Bad content-type header, no multipart boundary");
  }

  const boundary = "\r\n--" + (boundaryMatch[1] || boundaryMatch[2]);
  const contentAsString = "\r\n" + convertBufferToString(bodyBuffer);

  const parts = contentAsString.split(new RegExp(boundary));

  for (let i = 1; i < parts.length - 1; i++) {
    const contentStartPos = parts[i].indexOf("\r\n\r\n") + 4;
    const partHeaders = parts[i].substr(0, contentStartPos - 4).split("\r\n");
    const partContent = parts[i].substr(contentStartPos);

    let fieldname = "",
      filename = "";
    for (let j = 1; j < partHeaders.length; j++) {
      var headerFields = extractPartHeader(partHeaders[j]);
      if (headerFields.name) fieldname = headerFields.name;
      if (headerFields.filename) filename = headerFields.filename;
    }

    if (filename) {
      if (!result.files) result.files = [];
      result.files.push({
        fieldname,
        originalname: filename,
        content: rawStringToBuffer(partContent),
      });
    } else result[fieldname] = partContent;
  }

  return result;
};

function extractPartHeader(header: string): IPartHeader {
  const headerFields = {} as IPartHeader;
  let matchResult = header.match(/[;| ]name="([^"]*)"/);
  if (matchResult) headerFields.name = matchResult[1];
  matchResult = header.match(/^.*filename="([^"]*)"$/);
  if (matchResult) headerFields.filename = matchResult[1];
  return headerFields;
}

const extractWwwForm = (bodyBuffer: Buffer): ExtractedContent => {
  const result: ExtractedContent = {};
  const content = convertBufferToString(bodyBuffer);
  const keyValues = content.split("&");
  for (const kv of keyValues) {
    const [key, value] = kv.split("=");
    result[decodeURIComponent(key)] = decodeURIComponent(value);
  }
  return result;
};
