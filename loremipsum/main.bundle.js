"use strict";

var loremIpsum = require("lorem-ipsum").loremIpsum;

window.onload = function () {

  var generateLoremButton = document.getElementById("generate-text");
  var loremTextContainer = document.getElementById("generated-text");

  generateLoremButton.addEventListener("click", function () {
    console.log(loremIpsum());
  });
};
