import { renderElements } from "./product_component.js";
import { addItemToShoppingCard } from "./products.js";

const allProductsBtn = document.getElementById("main-all-products-btn");
const shoppingCardBtn = document.getElementById("shopping-card-icon");
const shoppingCard = document.getElementById("shopping-card");

const API_SHOP_ITEMS = "http://127.0.0.1:5500/products.json";
// -- Main
function mainFeaturedCardsRender(arr) {
  const productBox = document.querySelector(".cards__wrapper");

  productBox.innerHTML += arr.map(renderElements).join("");
  allProductsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let card = document.querySelectorAll(".product__card");

    card.forEach((item) => {
      item.style.display = "flex";
    });
  });
}
// -- Shoping Card
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
  if (btn.id === "shoping-card-clear-all") {
    console.log("test");
    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key) || key === "itemArr") continue;
      localStorage.removeItem(key);
    }
    document.querySelector(".shopping-card__item-wrapper").innerHTML = "";
  }
}

async function setData() {
  const response = await fetch(API_SHOP_ITEMS);
  const data = await response.json();
  localStorage.setItem("itemArr", JSON.stringify(data));
  const itemsArr = JSON.parse(localStorage.getItem("itemArr"));

  mainFeaturedCardsRender(itemsArr);
}
setData();

shoppingCardBtn.addEventListener("click", (e) => {
  e.preventDefault();
  shoppingCard.classList.toggle("show");
});
shoppingCard.addEventListener("click", shoppingCardButtons);
