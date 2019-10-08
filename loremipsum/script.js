
const loremIpsum = require("lorem-ipsum").loremIpsum;

window.onload = () => {

  const generateLoremButton = document.getElementById("generate-text");
  const loremTextContainer = document.getElementById("generated-text");

  generateLoremButton.addEventListener("click", () => {
    console.log(loremIpsum());
  });

}
