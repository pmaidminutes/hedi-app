import fs from "fs";
import pathUtils from "path";

interface ISaveToDiskResult {
  succeed: boolean;
  error?: string;
  savedAsFilename?: string;
}

export const saveBufferToDisk = (
  content: Uint8Array,
  path: string,
  filename: string,
  saveAsOthernameIfExists: boolean = true
): ISaveToDiskResult => {
  filename = getSafeFilename(filename);
  const fullpath = pathUtils.join(path, filename);
  try {
    if (fs.existsSync(fullpath) && !saveAsOthernameIfExists)
      return {
        succeed: false,
        error: "file already exists",
      };
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
    const savedAsFilename = getUniqueFilename(path, filename);
    fs.writeFileSync(
      pathUtils.join(path, savedAsFilename),
      Buffer.from(content)
    );
    return { succeed: true, savedAsFilename };
  } catch (error) {
    return {
      succeed: false,
      error: error.message ?? error.name ?? JSON.stringify(error),
    };
  }
};

const getUniqueFilename = (path: string, filename: string) => {
  if (fs.existsSync(pathUtils.join(path, filename))) {
    const extension = pathUtils.extname(filename);
    const rawFilename = filename.substr(0, filename.length - extension.length);
    let counter = 0;
    while (
      fs.existsSync(
        pathUtils.join(path, rawFilename + "_" + counter + extension)
      )
    )
      counter++;
    filename = rawFilename + "_" + counter + extension;
  }
  return filename;
};

export const getSafeFilename = (filename: string) =>
  filename
    .replace(/\/|\\|\||>|<|"|\*/g, "")
    .replace(/\.\./g, "")
    .replace(/\s/g, "-");
