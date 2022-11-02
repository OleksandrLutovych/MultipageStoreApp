const form = document.getElementById("form");
const submit = document.getElementById("submit");
const todoContent = document.getElementById("todo-content");
const clearAll = document.getElementById("clear-all");
const todoBox = document.getElementById("todo-container");
const input = document.getElementById("input");
let date = new Date(Date.now() + 86400e3).toUTCString();
let number;
let cookieArr = document.cookie.split(";");

const toHTML = (item) => {
  return `<div class="todo-element__box">
    <label class="todo-element__box_content" id="todo-content">${item}</label>
    <input type="checkbox">
    <a href="" id="clear-todo">&#10007;</a>
</div>`;
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    ...options,
  };
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let updatedCookie = encodeURIComponent(name) + "=" + value;
  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}
function deleteCookie(name) {
  setCookie(name, "", {
    "max-age": -1,
  });
}

function addTask() {
  if (document.cookie === "" || document.cookie === null) number = 0;
  else {
    number = +cookieArr[cookieArr.length - 1].trim().split("")[0] + 1
  }
  console.log(number);
  form.addEventListener("submit", () => {
    if (input.value) {
      setCookie(number, input.value);
      number++;
      renderElement();
    }
  });
}
function renderElement() {
  todoBox.innerHTML = cookieArr
    .map((e, index) => {
      return toHTML(getCookie(`${index}`));
    })
    .join("");
const clearTodo = document.getElementById("clear-todo");
clearTodo.addEventListener("click", () => {
    deleteCookie('1');
});
}

addTask();
renderElement();
