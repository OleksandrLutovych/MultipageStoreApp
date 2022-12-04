const allProductsBtn = document.getElementById("all-products");
const productsItemBox = document.querySelector(".products__box");
const companyNameItemsCounter = document.querySelectorAll(".number-of-element");
const form = document.querySelector(".users__bar");
const rangeInput = document.getElementById("price-input");
const searchBar = document.getElementById("search-bar");
const shoppingCardBtn = document.getElementById("basket");
const addToCartBtn = document.querySelectorAll(".add-to-cart");
const companyNameBlock = document.querySelector(".company-name-box");

const shopItems = "http://127.0.0.1:5500/products.json";

function getItems() {
  return fetch(shopItems).then(function (response) {
    return response.json();
  });
}
const renderElements = (item) =>
  `<a href="" class="product__card">
      <img src="${item.image}" alt="">
      <span class="product__card_name">${item.name}</span>
      <span class="product__card_price">${item.price}</span>
      <button class="add-to-cart">Add to cart</button>
  </a>`;

const renderElementsInShopingCart = (item) =>
  `<div class="shopping-card__item">
  <img src="${item.image}" alt="">
  <div class="shopping-card__item_info">
      <span>${item.name}</span>
      <span>${item.price}</span>
      <button>remove</button>
  </div>
  <div class="toggle-arrow">
      <button>&#8743;</button>
      <span>4</span>
      <button>&#8744;</button>
  </div>
</div>`;

// ------- Home page
function mainFeaturedCardsRender() {
  const productBox = document.querySelector(".cards__wrapper");
  getItems().then((itemsArr) => {
    productBox.innerHTML += itemsArr.map(renderElements).join("");
    allProductsBtn.addEventListener("click", () => {
      let card = document.querySelectorAll(".product__card");

      card.forEach((item) => {
        item.style.display = "flex";
      });
    });
  });
}
// ------- Products page
function productsAllRender() {
  getItems().then((itemsArr) => {
    productsItemBox.innerHTML += itemsArr.map(renderElements).join("");
    countOfElement(itemsArr);
  });
}
function countOfElement(arr) {
  const hashmap = arr.reduce(
    (accum, { type }, _, array) => {
      return {
        ...accum,
        [type]: array.filter((i) => {
          if (
            i.type === type &&
            i.name.toLowerCase().startsWith(searchBar.value.trim()) &&
            Math.floor(i.price) < rangeInput.value
          )
            return i;
        }).length,
      };
    },
    { Ikea: 0, Marcos: 0, Caressa: 0, Liddy: 0 }
  );

  companyNameItemsCounter[0].innerHTML = arr.length;
  companyNameItemsCounter[1].innerHTML = hashmap.Ikea;
  companyNameItemsCounter[2].innerHTML = hashmap.Marcos;
  companyNameItemsCounter[3].innerHTML = hashmap.Caressa;
  companyNameItemsCounter[4].innerHTML = hashmap.Liddy;

  for (let block of companyNameBlock.children) {
    if (block.children[1].innerHTML < 1) {
      block.children[0].disabled = true;
    } else {
      block.children[0].disabled = false;
    }
  }
}

function searchBySearchBar() {
  getItems().then((itemsArr) => {
    searchBar.addEventListener("input", () => {
      const result = itemsArr.filter((item) => {
        if (
          (item.name.toLowerCase().startsWith(searchBar.value.trim()) ||
          item.name.toUpperCase().startsWith(searchBar.value.trim())) &&
            Math.floor(item.price) < rangeInput.value
        ) 
          return item;
      });
      productsItemBox.innerHTML = result.map(renderElements).join("");
      countOfElement(result);
    });
  });
}

function sortedByType() {
  getItems().then((itemsArr) => {
    companyNameBlock.addEventListener("click", (e) => {
      e.preventDefault();
      const btn = e.target;

      if (btn.tagName !== "BUTTON") return;
      if (btn.innerHTML === "All")
        return (productsItemBox.innerHTML = itemsArr
          .map((item) => {
            if (
              item.name.toLowerCase().startsWith(searchBar.value.trim()) &&
              Math.floor(item.price) < rangeInput.value
            )
              return renderElements(item);
          })
          .join(""));
      productsItemBox.innerHTML = itemsArr
        .map((item) => {
          if (btn.innerHTML === item.type) {
            if (
              item.name.toLowerCase().startsWith(searchBar.value.trim()) &&
              Math.floor(item.price) < rangeInput.value
            )
              return renderElements(item);
          }
        })
        .join("");
    });
  });
}

function searchItemByRange() {
  const rangeInputValueInfo = document.querySelector("output");
  rangeInputValueInfo.innerHTML = rangeInput.value;

  getItems().then((itemsArr) => {
    rangeInput.addEventListener("input", (e) => {
      e.preventDefault();
      rangeInputValueInfo.innerHTML = rangeInput.value;
      // -- Render element sort using range input
      const result = itemsArr.filter((item) => {
        if (
          Math.floor(item.price) < rangeInput.value &&
          item.name.toLowerCase().startsWith(searchBar.value.trim())
        )
          return item;
      });
      productsItemBox.innerHTML = result.map(renderElements).join("");
      // -- Counter of element
      countOfElement(result);
    });
  });
}

// ------- Shopping cart
function addItemtoShoppingCard() {
  const shoppingCardWrapper = document.querySelector(
    ".shopping-card__item-wrapper"
  );

  getItems().then((itemsArr) => {
    const storageArr = itemsArr.filter((item) => {
      for (let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) continue;
        if (key === item.name) return item;
      }
    });
    shoppingCardWrapper.innerHTML += storageArr
      .map(renderElementsInShopingCart)
      .join("");
  });
}
shoppingCardBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const shoppingCard = document.getElementById("shopping-card");
  shoppingCard.classList.toggle("show");
});

mainFeaturedCardsRender();
productsAllRender();
addItemtoShoppingCard();
searchBySearchBar();
sortedByType();
searchItemByRange();

productsItemBox.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.className === "add-to-cart") {
    const result = e.target.parentElement;
    const key = result.querySelector(".product__card_name").innerHTML;
    const value = result.querySelector(".product__card_price").innerHTML;
    console.log(key, value);
    localStorage.setItem(key, value);
  }
});
