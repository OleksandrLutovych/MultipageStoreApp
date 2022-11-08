const form = document.forms.form;
const clearAll = document.getElementById("clear-all");
const todoBox = document.querySelector("#todo-container");
const input = document.getElementById("input");
const editBtn = document.getElementById("edit");

let todoId;
let isTodoTarget = false;
let expiresDate = new Date(Date.now() + 86400e3).toUTCString();
let cookieArr = document.cookie.split("; ");

const toHTML = (content, id) => {
  return `<div class="todo-element__box" id="${id}">
    <span class="todo-element__box_content" id="${id}">${content}</span>
    <button class="clear-todo">&#10007</button>
</div>`;
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
check();
form.addEventListener("submit", addTodo);
todoBox.addEventListener("click", todoItemHandle);
clearAll.addEventListener("click", deleteAll);
editBtn.addEventListener("click", editTodo);

function addTodo(e) {
  e.preventDefault();
  if (input.value.trim()) {
    const todoContent = input.value;
    let cookieId = new Date().getMilliseconds();

    setCookie("todo" + cookieId, todoContent);
    renderElement("todo" + cookieId, todoContent);
    input.value = "";
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
  const btn = e.target;
  const item = btn.closest(".todo-element__box");
  let todo;

  if (btn.className === "clear-todo" && item) {
    e.preventDefault();
    deleteItem(item);
  }

  if (btn.tagName === "SPAN" && item) {
    const todoText = item.querySelector("span");
    input.value = todoText.innerHTML;
    todoId = todoText.id;
    console.log(todoId);
    isTodoTarget = true;
  }
}
editBtn.addEventListener("click", editTodo);
function editTodo(e) {
  const todoText = document.getElementById(`${todoId}`);
  if (input.value.trim() && isTodoTarget) {
    setCookie(todoId, input.value);
    todoText.innerHTML = `<span class="todo-element__box_content" id="${todoId}">${input.value}</span>
    <button class="clear-todo">&#10007</button>`;
    isTodoTarget = false;
    input.value = "";
  } else if (input.value.trim() == "" && isTodoTarget) {
    
    deleteCookie(todoId);
    todoText.remove()
  } else {
    return;
  }
}

function deleteItem(item) {
  const todoItem = item.getAttribute("id");
  deleteCookie(todoItem);
  item.remove();
}

function deleteAll(e) {
  cookieArr.forEach((item) => {
    const todoName = item.split("=")[0];
    deleteCookie(todoName);
  });
  todoBox.innerHTML = "";
}
