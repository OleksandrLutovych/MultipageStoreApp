const allProductsBtn = document.getElementById("all-products");
const productsItemBox = document.querySelector(".products__box");
const companyNameItemsCounter = document.querySelectorAll(".number-of-element");
const form = document.querySelector(".users__bar");
const rangeInput = document.getElementById("price-input");
const searchBar = document.getElementById("search-bar");
const shoppingCardBtn = document.getElementById("basket");
const addToCartBtn = document.querySelectorAll('.add-to-cart')

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
      <button class="add-to-cart">Add to cart</button>
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

    companyNameItemsCounter[0].innerHTML = itemsArr.length;
    companyNameItemsCounter[1].innerHTML = itemsArr.filter(
      (item) => item.type === "Ikea"
    ).length;
    companyNameItemsCounter[2].innerHTML = itemsArr.filter(
      (item) => item.type === "Marcos"
    ).length;
    companyNameItemsCounter[3].innerHTML = itemsArr.filter(
      (item) => item.type === "Caressa"
    ).length;
    companyNameItemsCounter[4].innerHTML = itemsArr.filter(
      (item) => item.type === "Liddy"
    ).length;

    console.log(companyNameItemsCounter);
  });
}

function searchBySearchBar() {
  getItems().then((itemsArr) => {
    searchBar.addEventListener("input", () => {
      const result = itemsArr.filter((item) => {
        if (
          item.name.toLowerCase().startsWith(searchBar.value.trim()) &&
          Math.floor(item.price) < rangeInput.value || 
          item.name.toUpperCase().startsWith(searchBar.value.trim())
        )
          return item;
      });
      productsItemBox.innerHTML = result.map(renderElements).join("");
      companyNameItemsCounter[0].innerHTML = result.length;
      companyNameItemsCounter[1].innerHTML = itemsArr.filter((item) => {
        if (
          item.name.toLowerCase().startsWith(searchBar.value.trim()) &&
          item.type === "Ikea" &&
          Math.floor(item.price) < rangeInput.value
        ) {
          return item;
        }
      }).length;
      companyNameItemsCounter[2].innerHTML = itemsArr.filter((item) => {
        if (
          item.name.toLowerCase().startsWith(searchBar.value.trim()) &&
          item.type === "Marcos" &&
          Math.floor(item.price) < rangeInput.value
        ) {
          return item;
        }
      }).length;
      companyNameItemsCounter[3].innerHTML = itemsArr.filter((item) => {
        if (
          item.name.toLowerCase().startsWith(searchBar.value.trim()) &&
          item.type === "Caressa" &&
          Math.floor(item.price) < rangeInput.value
        ) {
          return item;
        }
      }).length;
      companyNameItemsCounter[4].innerHTML = itemsArr.filter((item) => {
        if (
          item.name.toLowerCase().startsWith(searchBar.value.trim()) &&
          item.type === "Liddy" &&
          Math.floor(item.price) < rangeInput.value
        ) {
          return item;
        }
      }).length;
    });
  });
}

function sortedByType() {
  const companyNameBlock = document.querySelector(".company-name-box");

  getItems().then((itemsArr) => {
    companyNameBlock.addEventListener("click", (e) => {
      e.preventDefault();
      const btn = e.target;
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
        ) {
          return item;
        }
      });
      productsItemBox.innerHTML = result.map(renderElements).join("");
      // -- Counter of element
      companyNameItemsCounter[0].innerHTML = result.length;
    });
  });
}

productsItemBox.addEventListener('click', (e)=> {
  e.preventDefault()
  if(e.target.className === "add-to-cart" ) {
    const result = e.target.parentElement
    const key = result.querySelector('.product__card_name').innerHTML
    const value = result.querySelector('.product__card_price').innerHTML
    console.log(key, value)
    localStorage.setItem(key, value)
  }
})
shoppingCardBtn.addEventListener("click", (e) => {
  e.preventDefault()
  const shoppingCard = document.getElementById('shopping-card')
  shoppingCard.classList.toggle('show')
});

for (let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue;
  }
  console.log(key)
}
mainFeaturedCardsRender();
productsAllRender();
searchBySearchBar();
sortedByType();
searchItemByRange();



// searchItemAllFilterTest();

// function searchItemAllFilterTest() {
//   const rangeInput = document.getElementById("price");
//   const rangeInputValueInfo = document.querySelector("output");
//   rangeInputValueInfo.innerHTML = rangeInput.value;

//   getItems().then((itemsArr) => {
//     form.addEventListener("input", (e) => {
//       e.preventDefault();
//       const target = e.target;

//       if (target.id === "price") {
//         console.log(target);
//         productsItemBox.innerHTML = itemsArr
//           .map((item) => {
//             if (Math.floor(item.price) < rangeInput.value) {
//               return renderElements(item);
//             }
//           })
//           .join("");
//       }
//       if (target.id === "search-bar") {
//         console.log("test");
//       }
//     });
//   });
// }
