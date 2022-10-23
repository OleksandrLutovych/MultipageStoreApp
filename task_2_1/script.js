const changeColor = document.getElementById("change");
const backgroundText = document.getElementById("colorinfo");
let colorByRgb;
let colorByName;
let colorByHex;
let colorsArr = ["Red", "Blue", "Green", "Black", "White", "Yellow"];
let hexColorsArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

function nameColorFunc() {
  let colorNumber = Math.floor(Math.random() * colorsArr.length);
  colorByName = colorsArr[colorNumber];
  return colorByName;
}
function rgbColorFunc() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  colorByRgb = `rgb( ${r}, ${g}, ${b})`;
  return colorByRgb;
}
function hexColorFunc() {
  colorByHex = hexColorsArr
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
    .join("");
  colorByHex = "#" + colorByHex;
  return colorByHex;
}
console.log(colorByName);
let colorsMethodArray = [nameColorFunc, rgbColorFunc, hexColorFunc];
function randomColorsFunc() {
  let randomColors = Math.floor(Math.random() * colorsMethodArray.length);
  backgroundText.textContent = colorsMethodArray[randomColors]();
  document.body.style.background = backgroundText.textContent;
}
changeColor.addEventListener("click", randomColorsFunc);

randomColorsFunc();
