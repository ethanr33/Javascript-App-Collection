
const http = require("http");
const request = require("request");
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': "text/html"});
  fs.readFile('index.html', (err, html) => {
    if (err) {
      response.writeHead(404);
      response.write("File not found!");
    } else {
      response.write(html);
      app.use(express.static(path.join('node_modules/bootstrap/dist/css')));
      response.end();
    }
  });
}).listen(8000);

function getGithubStatus() {
  request('https://www.githubstatus.com/',  { json: true }, (err, res, body) => {  
    console.log(body);
  });
}