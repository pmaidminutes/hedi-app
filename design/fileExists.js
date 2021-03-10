const fs = require("fs");

const PATH_TO_IMPORTS = __dirname + "/imports.ts";
const exists = fs.existsSync(PATH_TO_IMPORTS);
if (!exists) fs.copyFileSync(__dirname +"/__import_boilerplate.ts", __dirname +"/imports.ts");
console.log({ exists });
