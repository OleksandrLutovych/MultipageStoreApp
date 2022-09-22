const changeColor = document.getElementById("change");
const backgroundText = document.getElementById("color");

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  let newColor = `rgb( ${r}, ${g}, ${b})`;
  document.body.style.background = newColor;
  backgroundText.textContent = newColor;
}
randomColor();

changeColor.addEventListener("click", randomColor);
