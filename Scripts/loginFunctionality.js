//get inputs and buttons
let email = document.querySelector("#email");
let password = document.querySelector("#password");

const loginButton = document.querySelector("#login__btn");
const loginForm = document.querySelector("#login__form");

const errorMessage = document.querySelector("#error__message");
errorMessage.innerHTML = "";

//update password value on keyup
password.addEventListener("keyup", (e) => {
  password.value = e.target.value;
});

//add event listener to the form for form submission
loginForm.addEventListener("submit", (e) => {
  //call  the login() function 
  login(e);
});

function login(event) {
  //prevent form submission by default
  event.preventDefault();

  //retrieve input values
  const correctPassword = localStorage.getItem(email.value);
  const inputPassword = password.value;

  //see/check if email exists in localStorage
  if (correctPassword === null) {
    //change/update error message when email is not found in localStorage
    errorMessage.innerHTML = "This email is not registered, please sign up!!!";
    return;
  }

  //check if password matches the one stored in localStorage
  if (correctPassword !== inputPassword) {
    //display/update error message when password is incorrect
    errorMessage.innerHTML = "Incorrect Password, Try Again!!!";
    return;
  }

  //empty/reset error message when login is successful
  errorMessage.innerHTML = "";

  //empty/reset inputs after successful login
  email.value = "";
  password.value = "";
}
