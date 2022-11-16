const changeModeBtn = document.getElementById("darkmode");
const form = document.forms;
const search = document.querySelector("input");
const regionSelect = document.getElementById("region-select");
const contentBox = document.querySelector('.content__wrapper')


const renderCountry = (country) => {
  `<div class="country__card">
    <img src="https://flagcdn.com/w320/mr.png" alt="">
    <span class="country">Afganistan</span>
    <p><span>Population: </span></p>
    <p><span>Region: </span></p>
    <p><span>Capital: </span></p>
</div>`;
};
 fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then(item => item)

