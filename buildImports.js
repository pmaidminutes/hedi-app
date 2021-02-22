const read = require("fs-readdir-recursive");
const fs = require("fs");
const FOLDER_NAME = "./design/data";
const PATH_TO_IMPORTS = "./design/imports.ts";

const data = read(FOLDER_NAME);
const filteredData = data.filter(element => element.endsWith(".json"));

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const camelCasing = array => {
  return array.map((element, index) =>
    index !== 0 ? capitalizeFirstLetter(element) : element
  );
};

const generateId = string => {
  return camelCasing(
    camelCasing(string.substring(0, string.length - 5).split("/"))
      .join("")
      .split("-")
  ).join("");
};

function exporting() {
  const imports = [];
  const propsMap = [];

  filteredData.forEach(path => {
    const uniqueId = generateId(path);
    imports.push(`import ${uniqueId} from '${'./data'}/${path}';`);
    propsMap.push(
      `['${
        path.startsWith("de/")
          ? path.substring(3).substring(0, path.length - 8)
          : path.substring(0, path.length - 5)
      }', ${uniqueId}.pageProps]`
    );
  });

  const exportFileData = `
  ${imports.join("\n")}

  export const propsMap = [
    ${propsMap.join(",\n")}
  ];
  `;

  fs.writeFileSync(PATH_TO_IMPORTS, "", function () {
    console.log("cleaned");
  });
  fs.writeFileSync(PATH_TO_IMPORTS, exportFileData);
}
exporting();
