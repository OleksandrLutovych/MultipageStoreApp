import { renderElements } from "./product_component.js";
const itemsArr = JSON.parse(localStorage.getItem("itemArr"));
const allProductsBtn = document.getElementById("main-all-products-btn");
const shoppingCardBtn = document.getElementById("shopping-card-icon");
const shoppingCard = document.getElementById("shopping-card");
const shoppingCardWrapper = document.querySelector(
    ".shopping-card__item-wrapper"
  );
  const shoppingCardIconNumber = document.getElementById('number-of-items')
// -- Main
function mainFeaturedCardsRender() {
  const productBox = document.querySelector(".cards__wrapper");

  productBox.innerHTML += itemsArr.map(renderElements).join("");
  allProductsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let card = document.querySelectorAll(".product__card");

    card.forEach((item) => {
      item.style.display = "flex";
    });
  });
}
// -- Shoping Card
function addItemToShoppingCard() {
  const storageArr = itemsArr.filter((item) => {
    const itemName = item.name.split(" ").join("");
    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) continue;
      if (key === itemName) {
        const value = localStorage.getItem(key);
        return item;
      }
    }
  });
  const numberOfElementsInShoppingCard = storageArr.reduce((accum, _, index, array) => {
    return array.length
})
shoppingCardIconNumber.innerHTML = numberOfElementsInShoppingCard

  shoppingCardWrapper.innerHTML = storageArr
    .map((item) => {
      const countOfElement = localStorage.getItem(
        item.name.split(" ").join("")
      );
      return `<div class="shopping-card__item ${item.name.split(" ").join("")}">
    <img src="${item.image}" alt="">
    <div class="shopping-card__item_info">
        <span>${item.name}</span>
        <span>${item.price}</span>
        <button>remove</button>
    </div>
    <div class="toggle-arrow">
        <button class="increase">&#8743;</button>
        <span class="counter">${countOfElement}</span>
        <button class="reduce">&#8744;</button>
    </div>
  </div>`;
    })
    .join("");
}
function shoppingCardButtons(e) {
  e.preventDefault();
  const btn = e.target;
  if (btn.className === "close") {
    shoppingCard.classList.toggle("show");
  }
  if (btn.tagName === "BUTTON") {
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

mainFeaturedCardsRender();
addItemToShoppingCard();

shoppingCardBtn.addEventListener("click", (e) => {
  e.preventDefault();
  shoppingCard.classList.toggle("show");
});
shoppingCard.addEventListener("click", shoppingCardButtons);


