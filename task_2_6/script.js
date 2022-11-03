const form = document.getElementById("form");
const submit = document.getElementById("submit");
const todoContent = document.getElementById("todo-content");
const clearAll = document.getElementById("clear-all");
const todoBox = document.querySelector("#todo-container");
const input = document.getElementById("input");
let date = new Date(Date.now() + 86400e3).toUTCString();
let number;
let cookieArr = document.cookie.split(";");
console.log(cookieArr.length)
const toHTML = (item, index) => {
  return `<div class="todo-element__box">
    <label class="todo-element__box_content" id="todo-content" >${item}</label>
    <input type="checkbox">
    <a href="" class="clear-todo" data-action="${index}">&#10007;</a>
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
    number = +cookieArr[cookieArr.length-1].trim().split("")[0];
  }
  console.log(number);
  form.addEventListener("submit", () => {
    if (input.value) {
      setCookie(number, input.value);
      number = number + 1;
      renderElement();
    }
  });
}
function renderElement() {
  if (document.cookie === "" || document.cookie === null) {
    todoBox.innerHTML = toHTML("add your new task...");
  } else {
    todoBox.innerHTML = cookieArr
      .map((e, index) => {
        todoBox && todoBox.addEventListener("click", btnHandler);
        return toHTML(getCookie(`${index}`), index);
      })
      .join("");
  }
}
const btnHandler = (e) => {
    const btn = e.target;
    console.log(btn.dataset.action);
    if (btn.tagName === "A") {
      deleteCookie(`${btn.dataset.action}`);
    }
  };
addTask();
renderElement();
