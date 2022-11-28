const allProductsBtn = document.getElementById("all-products");
const productsItemBox = document.querySelector(".products__box");

const shopItems = "http://127.0.0.1:5500/products.json";

function getItems() {
  return fetch(shopItems).then(function (response) {
    return response.json();
  });
}
const renderElements = (item) => {
  return `<a href="" class="product__card">
      <img src="${item.image}" alt="">
      <span class="product__card_name">${item.name}</span>
      <span class="product__card_price">${item.price}</span>
  </a>`;
};
// ------- Home page
function mainFeaturedCardsRender() {
  var productBox = document.querySelector(".cards__wrapper");
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
  });
}

function searchBySearchBar() {
  const searchBar = document.getElementById("search-bar");
  getItems().then((itemsArr) => {
    searchBar.addEventListener("keyup", () => {
      productsItemBox.innerHTML = itemsArr
        .map((item) => {
          if (item.name.toLowerCase().startsWith(searchBar.value.trim()))
            return renderElements(item);
        })
        .join("");
    });
  });
}

function sortedByType() {
  const companyNameBlock = document.querySelector(".company-name-box");

  getItems().then((itemsArr) => {
    companyNameBlock.addEventListener("click", (e) => {
      e.preventDefault();
      const btn = e.target;
      console.log(btn);

      if (btn.innerHTML === "All") {
        return (productsItemBox.innerHTML = itemsArr
          .map(renderElements)
          .join(""));
      }
      productsItemBox.innerHTML = itemsArr
        .map((item) => {
          if (btn.innerHTML === item.type) {
            return renderElements(item);
          }
        })
        .join("");
    });
  });
}

function searchByRangeInput() {
  const rangeInput = document.getElementById("price");
  const rangeInputValueInfo = document.querySelector("#price-value");

  getItems().then((itemsArr) => {
    rangeInput.addEventListener("click", (e) => {
      e.preventDefault();
    //   rangeInputValueInfo.innerHTML = rangeInput.value;

      productsItemBox.innerHTML = itemsArr
        .map((item) => {
          if (item.price <= rangeInput.value) return renderElements(item);
        })
        .join("");
    });
  });
}

mainFeaturedCardsRender();
productsAllRender();
searchBySearchBar();
sortedByType();
searchByRangeInput();
