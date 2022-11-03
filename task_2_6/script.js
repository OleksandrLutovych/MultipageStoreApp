const form = document.getElementById("form");
const submit = document.getElementById("submit");
const clearAll = document.getElementById("clear-all");
const todoBox = document.querySelector("#todo-container");
const input = document.getElementById("input");
let expiresDate = new Date(Date.now() + 86400e3).toUTCString();
let cookieArr = document.cookie.split("; ");


const toHTML = (content, id) => {
  return `<div class="todo-element__box" id="${id}">
    <label class="todo-element__box_content" id="todo-content" >${content}</label>
    <input type="checkbox">
    <a href="" class="clear-todo" onclick="event.preventDefault(); deleteItem('${id}')">&#10007;</a>
</div>`;
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function setCookie(name, value) {
  document.cookie = `${name}=${value}; expires=${expiresDate}` ;
}
function deleteCookie(name) {
  document.cookie = name + "=; max-age=-1";
}
//- ------------------------ Cookie func

function addTask() {
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (input.value && input.value.trim() !== '') {
      let cookieId = new Date();
      setCookie("todo" + cookieId.getTime(), input.value);
      renderElement('todo'+ cookieId.getTime(), input.value)
      input.value = null
    }
  });
}
function renderElement(id, value) {
  todoBox.innerHTML += toHTML(getCookie(id, value), id);
}

function deleteItem(id) {
  document.getElementById(id).remove()
  deleteCookie(id);
}

function check() {
  cookieArr.sort();
  let part;
  for (let i = 0; i < cookieArr.length; i++) {
    part = cookieArr[i].split("=");
    if (part[0]) {
      try {
        renderElement(part[0],decodeURI(part[1]));
      } catch (error) {
        console.log(error.message + " " + part[1]);
      }
    }
  }
}
const btnHandler = (e) => {
    e.preventDefault()
    const btn = e.target;
    // console.log(btn);
    if (btn.tagName === "label") {
        todoContent.style.display = 'none'
    }
    };
    
function main() {
  addTask();
  check();  
  todoBox.addEventListener("click", btnHandler);
}

main();
