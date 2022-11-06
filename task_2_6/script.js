const todoWrapper = document.querySelector(".todo__wrapper");
const form = document.forms.form;
const submit = document.getElementById("submit");
const clearAll = document.getElementById("clear-all");
const todoBox = document.querySelector("#todo-container");
const input = document.getElementById("input");
const edit = document.getElementById("edit");
let expiresDate = new Date(Date.now() + 86400e3).toUTCString();
let cookieArr = document.cookie.split("; ");
edit.setAttribute("disabled", "");

const toHTML = (content, id) => {
  return `<form class="todo-element__box" id="${id}">
    <label class="todo-element__box_content" id="${id}">${content}</label>
    <a href="" class="clear-todo">&#10007;</a>
</form>`;
};

//------------------------- Cookie funcs

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function setCookie(name, value) {
  document.cookie = `${name}=${value}; expires=${expiresDate}`;
}
function deleteCookie(name) {
  document.cookie = name + "=; max-age=-1";
}

//------------------------- Main funcs

function addTodo(e) {
  e.preventDefault();
  if (input.value && input.value.trim() !== "") {
    let cookieId = new Date().getMilliseconds();
    setCookie("todo" + cookieId, input.value);
    renderElement("todo" + cookieId, input.value);
    input.value = null;
  }
}

function renderElement(id, value) {
  todoBox.innerHTML += toHTML(getCookie(id, value), id);
}

function check() {
  cookieArr.sort();
  let part;
  for (let i = 0; i < cookieArr.length; i++) {
    part = cookieArr[i].split("=");
    if (part[0]) {
      try {
        renderElement(part[0], decodeURI(part[1]));
      } catch (error) {
        console.log(error.message + " " + part[1]);
      }
    }
  }
}

function todoItemHandle(e) {
  e.preventDefault();
  const btn = e.target;
  const item = btn.closest(".todo-element__box");
  const editBtn = btn.closest("#edit");

  if (btn.tagName === "A" && item) {
    deleteItem(item);
  }
  if (btn.tagName === "LABEL" && item) {
    const todoText = item.querySelector("label");
    input.value = todoText.innerHTML;
    edit.disabled = false;
  }
  if (editBtn) {
    editTodo(todoText);
  }
}

function editTodo(item) {
  if (input.value && input.value.trim() !== "") {
    setCookie(item.id, input.value);
    item.innerHTML = input.value;
    form.reset();
  } else if (input.value.trim() == "") {
    deleteItem(item);
    edit.setAttribute("disabled", "");
  }
}

function deleteItem(item) {
  const todoItem = item.getAttribute("id");
  deleteCookie(todoItem);
  item.remove();
}

function deleteAll(e) {
  e.preventDefault();
  cookieArr.forEach((item) => {
    const todoName = item.split("=")[0];
    deleteCookie(todoName);
  });
  todoBox.innerHTML = "";
}

function main() {
  check();
  todoWrapper.addEventListener("click", todoItemHandle);
  form.addEventListener("submit", addTodo);
  clearAll.addEventListener("click", deleteAll);
}

main();
