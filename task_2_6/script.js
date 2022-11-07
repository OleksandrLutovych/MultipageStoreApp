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
  return `<form class="todo-element__box" id="${id}">
    <label class="todo-element__box_content" id="${id}">${content}</label>
    <button class="clear-todo">&#10007</button>
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

  if (btn.tagName === "LABEL" && item) {
    const todoText = item.querySelector("label");
    input.value = todoText.innerHTML;
    todoId = todoText.id;
    console.log(todoId);
    isTodoTarget = true;
  }
}

function editTodo(e) {
  if (input.value.trim() && isTodoTarget) {
    const todoText = document.getElementById(`${todoId}`)
    setCookie(todoId, input.value);
    todoText.innerHTML = toHTML(input.value, todoId)
    isTodoTarget = false;
  } else if (input.value.trim() == "" && isTodoTarget) {
    deleteCookie(todoId);
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
