const userName = document.getElementById("name"),
  userLastName = document.getElementById("lastname"),
  userEmail = document.getElementById("email"),
  userPassword = document.getElementById('password'),
  userPasswordConfirm = document.getElementById('passconfirm')
const btn = document.getElementById("createBtn"),
  form = document.getElementById("form"),
  err = document.querySelector("p");
const formInputs = [userName, userLastName, userEmail, userPassword, userPasswordConfirm];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formInputs.forEach((item) => {
    validator(item);
  });
});

let validator = (element) => {
  if (element.value === null || element.value.trim() === "") {
    element.style.borderColor = "red";
    err.innerHTML = "Error";
  } else {
    element.style.borderColor = "green";
    // err.innerHTML = null;
  }
};

class Validator {
  constructor(name) {
    this.methodName = name;
  }
  isEmail (string) {
      string === 1 ? console.log(true) : console.log(false)
  }
  isDate () {
    console.log('Hello isDate method')
  }
}

const valid = new Validator ('isEmail')
valid.isEmail()