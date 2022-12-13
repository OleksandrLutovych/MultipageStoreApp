const productsItemBox = document.querySelector(".products__box");
const companyNameItemsCounter = document.querySelectorAll(".number-of-element");
const form = document.querySelector(".users__bar");
const rangeInput = document.getElementById("price-input");
const searchBar = document.getElementById("search-bar");
const addToCartBtn = document.querySelectorAll(".add-to-cart");
const companyNameBlock = document.querySelector(".company-name-box");
const shoppingCardIconNumber = document.getElementById('number-of-items')

import { renderElements } from "./product_component.js";
const API_SHOP_ITEMS = "http://127.0.0.1:5500/products.json";

const shoppingCardBtn = document.getElementById("shopping-card-icon");
const shoppingCard = document.getElementById("shopping-card");
const shoppingCardWrapper = document.querySelector(
  ".shopping-card__item-wrapper"
);
let count = 1;

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
      const value = count;
      console.log(key, value);
      localStorage.setItem(key, value);
      addItemToShoppingCard(itemsArr);
    }
  });

}

setData();

// ------- Products page
function productsAllRender(arr) {
  productsItemBox.innerHTML += arr.map(renderElements).join("");
  countOfElement(arr);
}
function countOfElement(arr) {
  const hashmap = arr.reduce(
    (accum, { type }, _, array) => {
      if (accum[type] === undefined) return { ...accum, [type]: 0 };
      else
        return {
          ...accum,
          [type]: array.filter((i) => {
            if (
              i.type === type &&
              i.name
                .toLowerCase()
                .startsWith(searchBar.value.trim().toLowerCase()) &&
              Math.floor(i.price) < rangeInput.value
            ) {
              return i;
            }
          }).length,
        };
    },
    { All: 0}
  );
  hashmap.All = arr.length;
  console.log(hashmap);
  for (let i = 0; i < 5; i++) {
    if (companyNameItemsCounter[i].dataset.id === Object.keys(hashmap)[i]) {
      companyNameItemsCounter[i].innerHTML = Object.values(hashmap)[i];
    }
  }


  for (let block of companyNameBlock.children) {
    if (block.children[1].innerHTML < 1) {
      block.children[0].disabled = true;
    } else {
      block.children[0].disabled = false;
    }
  }
}

function searchBySearchBar(arr) {
  searchBar.addEventListener("input", () => {
    const result = arr.filter((item) => {
      if (
        item.name
          .toLowerCase()
          .startsWith(searchBar.value.trim().toLowerCase()) &&
        Math.floor(item.price) < rangeInput.value
      )
        return item;
    });
    productsItemBox.innerHTML = result.map(renderElements).join("");
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
          if (
            item.name
              .toLowerCase()
              .startsWith(searchBar.value.trim().toLowerCase()) &&
            Math.floor(item.price) < rangeInput.value
          )
            return renderElements(item);
        })
        .join(""));
    productsItemBox.innerHTML = arr
      .map((item) => {
        if (btn.innerHTML === item.type) {
          if (
            item.name
              .toLowerCase()
              .startsWith(searchBar.value.trim().toLowerCase()) &&
            Math.floor(item.price) < rangeInput.value
          )
            return renderElements(item);
        }
      })
      .join("");
  });
}

function searchItemByRange(arr) {
  const rangeInputValueInfo = document.querySelector("output");
  rangeInputValueInfo.innerHTML = rangeInput.value;

  rangeInput.addEventListener("input", (e) => {
    e.preventDefault();
    rangeInputValueInfo.innerHTML = rangeInput.value;
    // -- Render element sort using range input
    const result = arr.filter((item) => {
      if (
        Math.floor(item.price) < rangeInput.value &&
        item.name.toLowerCase().startsWith(searchBar.value.trim().toLowerCase())
      )
        return item;
    });
    productsItemBox.innerHTML = result.map(renderElements).join("");
    // -- Counter of element
    countOfElement(result);
  });
}
// -- Shoping Card
function addItemToShoppingCard(arr) {
    
  const storageArr = arr.filter((item) => {
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

shoppingCardBtn.addEventListener("click", (e) => {
  e.preventDefault();
  shoppingCard.classList.toggle("show");
});
shoppingCard.addEventListener("click", shoppingCardButtons);

