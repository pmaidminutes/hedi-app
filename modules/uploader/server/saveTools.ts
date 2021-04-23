import fs from "fs";

interface ISaveToDiskResult {
  succeed: boolean;
  error?: string;
}

export const saveBufferToDisk = (
  content: Uint8Array,
  path: string,
  filename: string
): ISaveToDiskResult => {
  try {
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
    fs.writeFileSync(
      path + (path.endsWith("/") ? "" : "/") + filename,
      Buffer.from(content)
    );
  } catch (error) {
    return {
      succeed: false,
      error: error.message ?? error.name ?? JSON.stringify(error),
    };
  }
  return { succeed: true };
};
