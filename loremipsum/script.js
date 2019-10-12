
window.onload = () => {

  const generateLoremButton = document.getElementById("generate-text");
  const loremTextContainer = document.getElementById("generated-text");
  const numParagraphs = document.getElementById("num-paragraphs");

  const corsProxy = "https://cors-anywhere.herokuapp.com/";

  let isActivated = false;

  generateLoremButton.addEventListener("click", () => {
    let input = numParagraphs.value;
    if (isNaN(input)) {
        loremTextContainer.innerHTML = "Please enter a number";
    } else if (input <= 0) {
        loremTextContainer.innerHTML = "Please enter a positive number";
    } else if (Math.floor(input) != input) {
        loremTextContainer.innerHTML = "Please enter a whole number";
    } else {
      loremTextContainer.innerHTML = `Generating ${input} paragraphs...`;
      getLoremText(input, (text, response) => {
        loremTextContainer.innerHTML = text;
      })
    }
  });

  async function getLoremText(paragraphs, callback) {
    let requestHeaders = {
      method: "GET",
      headers: {
        "Content-Type": "text/plain"
      }
    }

     let data = await fetch(`${corsProxy}http://loripsum.net/api/${paragraphs}/medium/plaintext`, requestHeaders)
      .then(response => response.text())
      .catch(error => {
          callback("There was an error, check the console", response);
      })
      .then(text => {
          callback(text);
      })

      return data;
  }

}
