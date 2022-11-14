const form = document.forms.form;
const clearAll = document.getElementById("clear-all");
const todoBox = document.querySelector("#todo-container");
const input = document.getElementById("input");

let expiresDate = new Date(Date.now() + 86400e3).toUTCString();
let cookieArr = document.cookie.split("; ");

const toHTML = (content, id) => {
  return `<div class="todo-element__box">
    <span class="todo-element__box_content" id="${id}">${content}</span>
    <button class="edit-todo">Edit</button>
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
    const editInput = document.createElement("input");
    const editBtn = item.querySelector(".edit-todo");

    todoText.replaceWith(editInput);
    editInput.value = todoText.innerHTML;
    editBtn.style.display = "block";

    editInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        editTodo(todoText, editInput, item, editBtn);
      }
    });
    editBtn.addEventListener("click", (e) => {
      editTodo(todoText, editInput, item, editBtn);
    });
  }
}

function editTodo(todo, input, item, btn) {
  if (input.value.trim()) {
    setCookie(todo.id, input.value);
    todo.textContent = input.value;
  } else if (input.value.trim() == "") {
    deleteCookie(todo.id);
    item.remove();
  } else {
    return;
  }
  btn.style.display = "none";
  input.replaceWith(todo);
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
