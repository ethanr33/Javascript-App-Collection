
window.onload = () => {

  //Username is user
  //Password is password

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const submitButton = document.getElementById("submit");
  const responseText = document.getElementById("response-text");

  const allowedUser = "user";
  const allowedPassword = "password";

  submitButton.addEventListener("click", () => {
    removeRedOutline(usernameInput);
    removeRedOutline(passwordInput);

    let user = usernameInput.value;
    let pass = passwordInput.value;
    if (checkCredentials(user, pass)) {
      window.location.replace("result.html")
    } else if (user.trim() == "") {
      responseText.innerHTML = "Please enter a username";
      addRedOutline(usernameInput);
    } else if (pass.trim() == "") {
      responseText.innerHTML = "Please enter a password";
    } else if (user.trim() == "" && pass.trim() == "") {
      responseText.innerHTML = "Please enter a username and password";
      addRedOutline(usernameInput);
      addRedOutline(passwordInput);
    }
    else if (user != allowedUser && pass != allowedPassword) {
     responseText.innerHTML = "Wrong username and password"
     addRedOutline(usernameInput);
     addRedOutline(passwordInput);
   } else if (user != allowedUser) {
      responseText.innerHTML = "Wrong username";
      addRedOutline(usernameInput);
    } else if (pass != allowedPassword) {
      responseText.innerHTML = "Wrong password";
      addRedOutline(passwordInput);
    }


  })

  function addRedOutline(element) {
    element.classList.remove("border-gray-400");
    element.classList.add("border-red-400");
  }

  function removeRedOutline(element) {
    element.classList.add("border-gray-400");
    element.classList.remove("border-red-400");
  }

  function checkCredentials(user, pass) {
    if (user === allowedUser && pass === allowedPassword) {
      return true;
    }
    return false;
  }

}
