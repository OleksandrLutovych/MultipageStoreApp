const userName = document.getElementById("name"),
  userLastName = document.getElementById("lastname"),
  userEmail = document.getElementById("email"),
  userPassword = document.getElementById("password"),
  userPasswordConfirm = document.getElementById("passconfirm");
const btn = document.getElementById("createBtn"),
  form = document.getElementById("form"),
  err = document.querySelectorAll("span");
const emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const letterVal = /^[a-zA-Z]*$/;
const namesForms = [userName, userLastName];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  namesForms.forEach((item, index) => {
    valid.isName(item, index);
  });
  valid.isEmail(userEmail);
  valid.isPass(userPassword);
  valid.isPassSame(userPasswordConfirm);
});
const correctData = (string, index) => {
  string.style.borderColor = "green";
  err[index].style.display = "none";
  return true;
};
const incorrectData = (string, data, index) => {
  string.style.borderColor = "red";
  err[index].style.display = "inline";
  err[index].innerHTML = `Use ${data}`;
  return false;
};

class Validator {
  isEmail(string) {
    if (!string.value.match(emailVal)) {
      incorrectData(string, "the correct email form", 2);
    } else {
      correctData(string, 2);
    }
  }
  isName(string, index) {
    if (string.value === "" || string.value === null) {
      incorrectData(string, "the correct name/last name", index);
    } else if (!string.value.match(letterVal)) {
      incorrectData(string, "only letters", index);
    } else {
      correctData(string, index);
    }
  }
  isPass(string) {
    if (
      string.value === "" ||
      string.value === null ||
      string.value.length < 8
    ) {
      incorrectData(string, "password with more 7", 3);
    } else {
      correctData(string, 3);
    }
  }
  isPassSame(string) {
    if (userPasswordConfirm.value !== userPassword.value) {
      incorrectData(string, 'the same passwords', 4)
    } else {
      correctData(string, 4);
    }
  }
  // isDate(string) {

  // }
}
const valid = new Validator();
