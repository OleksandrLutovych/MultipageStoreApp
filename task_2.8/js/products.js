const productsItemBox = document.querySelector(".products__box");
const companyNameItemsCounter = document.querySelectorAll(".number-of-element");
const rangeInput = document.getElementById("price-input");
const searchBar = document.getElementById("search-bar");
const companyNameBlock = document.querySelector(".company-name-box");
const shoppingCardIconNumber = document.getElementById("number-of-items");

import { renderElements } from "./product_component.js";
const API_SHOP_ITEMS = "http://127.0.0.1:5500/products.json";

const shoppingCardBtn = document.getElementById("shopping-card-icon");
const shoppingCard = document.getElementById("shopping-card");
const shoppingCardWrapper = document.querySelector(
  ".shopping-card__item-wrapper"
);
let count = 1;

function productsAllRender(arr) {
  productsItemBox.innerHTML += arr.map(renderElements).join("");
  countOfElement(arr);
}
function countOfElement(arr) {
  const hashmap = JSON.parse(localStorage.getItem("itemArr")).reduce(
    (accum, { type }) => {
      return { ...accum, [type]: 0 };
    },
    { All: arr.length }
  );

  arr.forEach((item) => {
    const name = item.name
      .toLowerCase()
      .includes(searchBar.value.trim().toLowerCase());

    if (name && Math.floor(item.price) < rangeInput.value) return hashmap[item.type]++;
  });
  for (let i = 0; i < 5; i++) {
    if (companyNameItemsCounter[i].dataset.id === Object.keys(hashmap)[i]) {
      companyNameItemsCounter[i].innerHTML = Object.values(hashmap)[i];
    }
  }
  for (let block of companyNameBlock.children) {
    const btn = block.children[0];
    const counter = block.children[1];

    if (counter.innerHTML < 1) {
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  }
}

function searchBySearchBar(arr) {
  searchBar.addEventListener("input", () => {
    const result = arr.filter((item) => {
      const name = item.name.toLowerCase().includes(searchBar.value.trim().toLowerCase());

      if (name && Math.floor(item.price) < rangeInput.value) return true
      else return false
    });
    setInnerHtml(productsItemBox, result.map(renderElements).join(""))
    countOfElement(result);
  });
}

function sortedByType(arr) {
  companyNameBlock.addEventListener("click", (e) => {
    e.preventDefault();
    const btn = e.target;

    if (btn.tagName !== "BUTTON") return;
    if (btn.innerHTML === "All")
      return (productsItemBox.innerHTML = arr
        .map((item) => {
            const name = item.name.toLowerCase().includes(searchBar.value.trim().toLowerCase());
            if (name && Math.floor(item.price) < rangeInput.value) return renderElements(item);
        })
        .join(""));
    productsItemBox.innerHTML = arr
      .map((item) => {
        const name = item.name.toLowerCase().includes(searchBar.value.trim().toLowerCase());

        if (btn.innerHTML === item.type) {
          if (name && Math.floor(item.price) < rangeInput.value) return renderElements(item);
        }
      })
      .join("");
  });
}

function searchItemByRange(arr) {
  const rangeInputValueInfo = document.querySelector("output");
  setInnerHtml(rangeInputValueInfo, rangeInput.value)

  rangeInput.addEventListener("input", (e) => {
    e.preventDefault();
    setInnerHtml(rangeInputValueInfo, rangeInput.value)
    const result = arr.filter((item) => {
        const name = item.name.toLowerCase().includes(searchBar.value.trim().toLowerCase());

        if (name && Math.floor(item.price) < rangeInput.value) return true
        else return false;
    }); 
    setInnerHtml(productsItemBox, result.map(renderElements).join(""))
    countOfElement(result);
  });
}
// -- Shoping Card

export function addItemToShoppingCard(arr) {
  const storageArr = arr.filter((item) => {
    if (Object.keys(localStorage).includes(item.name.split(" ").join(""))) {
        return true
    }
  });

  setInnerHtml(shoppingCardIconNumber, storageArr.length)

  shoppingCardWrapper.innerHTML = storageArr
    .map((item) => {
      const countOfElement = localStorage.getItem(remakeName(item.name));
      return `<div class="shopping-card__item ${remakeName(item.name)}">
    <img src="${item.image}" alt="">
    <div class="shopping-card__item_info">
        <span>${item.name}</span>
        <span>$${item.price}</span>
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
  if (btn.className === "close" || !btn) {
    shoppingCard.classList.remove("show");
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
    shoppingCardIconNumber.innerHTML = +shoppingCardIconNumber.innerHTML - 1
  }
  if (btn.id === "shoping-card-clear-all") {
    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key) || key === "itemArr") continue;
      localStorage.removeItem(key);
    }
    shoppingCardWrapper.innerHTML = "";
  }
  if (btn.className === "increase" || btn.className === "reduce") {
    const counter = btn.parentElement.querySelector(".counter");
    const itemBlock = e.target.parentElement.parentElement;
    const key = itemBlock.className.split(" ")[1];

    if (btn.className === "increase") {
      counter.innerHTML = +counter.innerHTML + 1;
      const value = +counter.innerHTML;
      localStorage.setItem(key, value);
    }
    if (btn.className === "reduce") {
      counter.innerHTML = +counter.innerHTML - 1;
      const value = +counter.innerHTML;
      localStorage.setItem(key, value);
    }
    if (counter.innerHTML < 1) {
      localStorage.removeItem(key);
      itemBlock.remove();
    }
  }
}
// -- Helpfull functions
function remakeName(name) {
  return name.split(" ").join("");
}
function setInnerHtml(element, text) {
    return element.innerHTML = text
}
// -- Call functions
async function setData() {
    const response = await fetch(API_SHOP_ITEMS);
    const data = await response.json();
    localStorage.setItem("itemArr", JSON.stringify(data));
    const itemsArr = JSON.parse(localStorage.getItem("itemArr"));
  
    addItemToShoppingCard(itemsArr);
    productsAllRender(itemsArr);
    searchBySearchBar(itemsArr);
    sortedByType(itemsArr);
    searchItemByRange(itemsArr);
    productsItemBox.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.className === "add-to-cart") {
        const result = e.target.parentElement;
        const key = result
          .querySelector(".product__card_name")
          .innerHTML.split(" ")
          .join("");
        console.log(key, count);
        localStorage.setItem(key, count);
        addItemToShoppingCard(itemsArr);
      }
    });
  }
setData();
shoppingCardBtn.addEventListener("click", (e) => {
  e.preventDefault();
  shoppingCard.classList.toggle("show");
});
shoppingCard.addEventListener("click", shoppingCardButtons);
