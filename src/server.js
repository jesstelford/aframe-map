const https = require('https');
const fs = require('fs');
const path = require('path');

require('isomorphic-fetch');

// Generate a key with:
// $ openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 3001 -nodes
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

const port = process.env.PORT || 8080;

// From https://developer.mozilla.org/en-US/docs/Node_server_without_framework
https.createServer(options, (request, response) => {
  console.log('request ', request.url);

  let filePath = `.${request.url}`;
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'applilcation/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml',
  };

  const contentType = mimeTypes[extname] || 'application/octect-stream';

  fs.readFile(filePath, (error, fileContent) => {

    if (error) {

      if (error.code === 'ENOENT') {

        if (filePath === './tiles.json') {
          // Proxy osm2vectortiles to convert the URLs to https
          fetch('https://osm2vectortiles.tileserver.com/v2.json')
            .then(res => res.json())
            .then(res => {
              res.tiles = res.tiles.map(tileUrl => tileUrl.replace(/^http:/, 'https:'));
              res.grids = res.grids.map(gridUrl => gridUrl.replace(/^http:/, 'https:'));
              response.writeHead(200, {
                'Content-Type': mimeTypes['.json'],
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Origin': '*',
              });
              response.end(JSON.stringify(res), 'utf-8');
            }).catch(_ => {
              fs.readFile('./404.html', (error404, content) => {
                response.writeHead(200, {'Content-Type': contentType});
                response.end(content, 'utf-8');
              });
            });
        } else {
          fs.readFile('./404.html', (error404, content) => {
            response.writeHead(200, {'Content-Type': contentType});
            response.end(content, 'utf-8');
          });
        }

      } else {
        response.writeHead(500);
        response.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
        response.end();
      }
    } else {
      response.writeHead(200, {'Content-Type': contentType});
      response.end(fileContent, 'utf-8');
    }

  });

}).listen(port);

console.log(`listening on port ${port}`);
