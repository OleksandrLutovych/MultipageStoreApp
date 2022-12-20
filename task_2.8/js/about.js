import { addItemToShoppingCard } from "./products.js";

const shoppingCardBtn = document.getElementById("shopping-card-icon");
const shoppingCard = document.getElementById("shopping-card");


function shoppingCardButtons(e) {
  e.preventDefault();
  const btn = e.target;

  if (btn.className === "close") {
    shoppingCard.classList.toggle("show");
  }
  if (btn.tagName === "BUTTON" && btn.innerHTML === "remove") {
    const elementName = btn.parentElement
      .querySelector("span")
      .innerHTML.split(" ")
      .join("");
    const blockName = document.querySelector(
      `.${elementName.split(" ").join("")}`
    );
    localStorage.removeItem(elementName);
    blockName.remove();
  }
  if (btn.id === 'shoping-card-clear-all') {
    console.log('test')
    for (let key in localStorage) {
        if(!localStorage.hasOwnProperty(key) || key === 'itemArr') continue
        localStorage.removeItem(key)
    }
    document.querySelector('.shopping-card__item-wrapper').innerHTML = ''
  }
}

function remakeName(name) {
  return name.split(" ").join("");
}
addItemToShoppingCard();

shoppingCardBtn.addEventListener("click", (e) => {
  e.preventDefault();
  shoppingCard.classList.toggle("show");
});
shoppingCard.addEventListener("click", shoppingCardButtons);

