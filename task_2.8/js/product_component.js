export function renderElements (item) {
  return `<a href="" class="product__card">
  <img src="${item.image}" alt="">
  <span class="product__card_name">${item.name}</span>
  <span class="product__card_price">${item.price}</span>
  <button class="add-to-cart">Add to cart</button>
</a>`
}
  