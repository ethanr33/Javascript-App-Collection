
const http = require("http");
const fs = require('fs');
const axios = require('axios');
const jsdom = require("jsdom");
const path = require('path');
const express = require('express');
const app = express();
const router = express.Router();


app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');



const { JSDOM } = jsdom;

let statuses = [];

app.get("/", (req, res) => {
  res.render("index");
})


app.get("/status", (req, res) => {
  axios.get("https://www.githubstatus.com/")
    .then(response => {
      let doc = new JSDOM(response.data);
      let statusContainers = doc.window.document.querySelector(".components-container.one-column").childNodes;
                    
      statusContainers.forEach(container => {
        if (container.constructor.name == "HTMLDivElement") {
          let textContainers = container.childNodes;
          textContainers.forEach(textContainer => {
            if (textContainer.constructor.name == "HTMLDivElement") {
              let status = textContainer.querySelector(":nth-child(3)").innerHTML.trim()
              if (status != "") {
                statuses.push(status);
              }
            }
          })
        }
      })
      statuses = statuses.reverse();
      res.send(JSON.stringify(statuses));
    })
    .catch(error => {
      res.send(error);
      console.log(error);
    })
})

app.use('/', router);

app.listen(8000, () => {
    console.log('Example app listening on port 3000!');
});
