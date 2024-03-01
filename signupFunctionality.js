const signupForm = document.querySelector("#signup__form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#password__confirm");
const lengthRequirement = document.querySelector("#length");
const lowerCaseRequirement = document.querySelector("#lower__case");
const upperCaseRequirement = document.querySelector("#upper__case");
const numberRequirement = document.querySelector("#number");
const specialCharacterRequirement = document.querySelector("#special__character");
const passwordErrorMessage = document.querySelector("#password__error__message");

signupForm.addEventListener("submit", (e) => {
  // Prevent the form from submitting by default
  e.preventDefault(); 
  // validates form
  const isValid = validateForm();

  if (isValid) {
    signUp();
  }
});

function validateForm() {
  // Reset previous validation states
  const requirements = [lengthRequirement, lowerCaseRequirement, upperCaseRequirement, numberRequirement, specialCharacterRequirement];
  requirements.forEach((requirement) => {
    requirement.classList.remove("valid", "invalid");
  });

  //form validation
  let isValid = true;

  if (password.value.length < 8) {
    lengthRequirement.classList.add("invalid");
    isValid = false;
  } else {
    lengthRequirement.classList.add("valid");
  }

  const regexTests = [
    { regex: /[a-z]/g, requirement: lowerCaseRequirement },
    { regex: /[A-Z]/g, requirement: upperCaseRequirement },
    { regex: /[0-9]/g, requirement: numberRequirement },
    { regex: /[\@\#\$\%\*\&]/g, requirement: specialCharacterRequirement }
  ];

  regexTests.forEach(({ regex, requirement }) => {
    if (!password.value.match(regex)) {
      requirement.classList.add("invalid");
      isValid = false;
    } else {
      requirement.classList.add("valid");
    }
  });

  if (confirmPassword.value !== password.value) {
    passwordErrorMessage.style.display = "block";
    passwordErrorMessage.style.color = "red";
    passwordErrorMessage.innerHTML = "Password and Confirm Password Must Be The Same!!!";
    isValid = false;
  } else {
    passwordErrorMessage.innerHTML = "";
  }

  if (localStorage.getItem(email.value)) {
    passwordErrorMessage.style.display = "block";
    passwordErrorMessage.style.color = "red";
    passwordErrorMessage.innerHTML = `This Email ${email.value} Is Already Registered!!!`;
    isValid = false;
  }

  return isValid;
}

function signUp() {
  localStorage.setItem(email.value, password.value);
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
}
