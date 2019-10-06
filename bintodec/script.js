
window.onload = () => {

  const numInput = document.getElementById("input");
  const numOutput = document.getElementById("output-text");
  const submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", e => {
    let input = numInput.value.toString();
    if (input.length == 0) {
      numOutput.innerHTML = "Please enter a binary number to convert to decimal";
    } else if (input.match(/\D/g)) {
      numOutput.innerHTML = "Please only enter numbers 0 and 1";
    } else if (input.match(/[2-9]/g)) {
      numOutput.innerHTML = "Please only use digits 0 and 1";
    } else {
      numOutput.innerHTML = `${input} in decimal is ${binToDec(input)}`;
    }
  });

  function binToDec(bin) {
    if (bin.length == 1) {
      return parseInt(bin);
    } else {
      return (Math.pow(2, (bin.length - 1)) * parseInt(bin.substring(0, 1))) + binToDec(bin.substring(1));
    }
  }

}
