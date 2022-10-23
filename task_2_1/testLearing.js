const changeColor = document.getElementById("change");
const backgroundText = document.getElementById("colorinfo");
let colorByRgb;
let colorByName;
let colorByHex;
function rgbColorFunc() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  colorByRgb = `rgb( ${r}, ${g}, ${b})`;
  return colorByRgb;
}

const colorsMethodArray = [rgbColorFunc];
function randomColorsFunc() {
  const randomColors = Math.floor(Math.random() * colorsMethodArray.length);
  colorsMethodArray[randomColors]();
  console.log(colorsMethodArray[randomColors]());
  document.body.style.background = colorsMethodArray[randomColors]();
  backgroundText.textContent = colorsMethodArray[randomColors]();
  changeColor.addEventListener("click", randomColorsFunc);
}
randomColorsFunc();
