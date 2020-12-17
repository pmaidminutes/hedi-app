/**
 * saves next pages as html
 * 
 * specify paths to store in the paths array
 * run the next js on localhost or change the location in the options object
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('url');
const next = require('next');

const paths = [
  '/beratung-und-hilfe',
  '/beratung-und-hilfe/schwangerschaftsberatung',
  '/beratung-und-hilfe/schwangerschaftskonfliktberatung',
  '/en/advice-and-assistance',
  '/en/advice-and-assistance/pregnancy-conflict-counselling',
  '/en/advice-and-assistance/pregnancy-consultation',
  '/en/finances-and-documents/documents/recognition-paternity',
  '/en/finances-and-documents/documents/custody-and-custody-declaration',
];

const exportFolder = path.join(
  __dirname, 
  "/export"
);

const port = 3000;
const hostname = 'localhost';

/* ------------------------------------------------------------------ */

const exporter = "\x1b[45mexporter\x1b[0m";
console.log(exporter+" removing old dev builds");
fs.rmdirSync(path.join(__dirname,'.next'), {recursive:true});

console.log(exporter+" starting a next server");
const app = next({dev: true});
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  await new Promise((resolve,reject) => { 
    http.createServer((req, res) =>  handle(req, res, parse(req.url, true)))
    .listen(port, err => (err) ? reject(err) : resolve() );
  });

  console.log(exporter+" init exporting to html files");
  const promises = [];
  for (var segment of paths) {
    const curPath = segment;
    const options = {hostname, port, curPath, method: 'GET'};
  
    const filename = path.join(exportFolder, curPath+".html");
    const basename = path.dirname(filename);
    if (!fs.existsSync(basename))
      fs.mkdirSync(basename, {recursive: true});
  
    promises.push(
      new Promise((resolve, reject) => {
        const req = http.request(options, res => {
          console.log(`\x1b[90m - ${curPath}\x1b[0m \x1b[32m${res.statusCode}\x1b[0m`);
          const chunks = [];
          res.on('data', d => chunks.push(d));
          res.on('end', () => { 
            let html = Buffer.concat(chunks).toString('utf8');
            html = html.replace(/<noscript.*?\/noscript>/g, '');
            html = html.replace(/<style.*?\/style>/g, '');
            html = html.replace(/<link rel=\"preload.*?\/style>/g, '');
            html = html.replace(/<script.*?\/script>/g, '');
            fs.writeFile(filename, html, { encoding: 'utf8' }, resolve);
          });
        });
        req.on('error', error => reject(error) );
        req.end();
      })
    );
  }
  await Promise.all(promises);
  console.log(exporter+" done exporting, ciao!");
  process.exit();
})


