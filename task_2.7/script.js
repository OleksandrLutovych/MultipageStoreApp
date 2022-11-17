const changeModeBtn = document.getElementById("darkmode");
const form = document.querySelector(".main__header");
const search = document.querySelector("input");
const regionSelect = document.getElementById("region-select");
const contentBox = document.querySelector(".content__wrapper");
const API = "https://restcountries.com/v3.1/all";

const apiData = fetch(API).then((response) => response.json());

const renderCountry = (country) => {
  return `<div class="country__card">
    <img src="${country.flags.png}" alt="">
    <span class="country">${country.name.common}</span>
    <p><span>Population: </span>${country.population}</p>
    <p><span>Region: </span>${country.region}</p>
    <p><span>Capital: </span>${country.capital}</p>
</div>`;
};

function allCountries() {
  apiData.then((countries) => {
    countries.map((item) => {
      if (!search.value.trim()) {
        contentBox.innerHTML += renderCountry(item);
      } else {
        let result = search.value;
        contentBox.innerHTML += result;
      }
    });
  });
}

function searchCountries(e) {
  e.preventDefault();
  let result = search.value;

  apiData.then((countries) => {
    contentBox.innerHTML = countries
      .map((item) => {
        if (item.name.common.toLowerCase().startsWith(result.trim())) {
          return renderCountry(item);
        }
      })
      .join("");
    if (!search.value.trim()) {
      contentBox.innerHTML = countries.map(renderCountry).join("");
    }
  });
}

function filterCountries(e) {
  const type = regionSelect.value;
  apiData.then((countries) => {
    contentBox.innerHTML = countries
      .map((item) => {
        if (item.region === type) {
          return renderCountry(item);
        }
      })
      .join(" ");
    if (type === "All") {
      contentBox.innerHTML = countries.map(renderCountry).join("");
    }
  });
}

allCountries();
regionSelect.addEventListener("change", filterCountries);
search.addEventListener("keyup", searchCountries);
changeModeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.toggle("dark-mode");
});
