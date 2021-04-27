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

export const getGuid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
