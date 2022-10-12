let menuItem;
const urlOfItem = "http://127.0.0.1:5500/dishes.json";
const btn = document.querySelectorAll(".menubtn");
const dishesBlock = document.querySelector(".content-items");
function toHTML(dishes) {
  return `
  <div id="item">
      <img src="${dishes.img}" alt="">
      <div class="item__info">
           <div class="item__info_title">
              <span class="item__name">${dishes.name}</span>
              <span class="item__price">${dishes.price}</span>
          </div>
          <div class="item__info_about">
              <span>${dishes.about}</span>
          </div> 
      </div>
  </div> 
`;
}

fetch(urlOfItem)
  .then((response) => response.json())
  .then((data) => (
    menuItem = data,
    dishesBlock.innerHTML = rendering("All")
    ));

const rendering = (type) =>
  type === "All"
    ? menuItem.map(toHTML).join("")
    : menuItem
        .map((dish) => dish.type === type ? toHTML(dish): '')
        .join("");

btn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    dishesBlock.innerHTML = rendering(btn.innerHTML);
  });
});
