const API_KEY = "84ab376bc569a13b293ad577b85732a8";
const search = document.getElementById("search-form");
const searchValue = document.getElementById("search");
const searchInfo = document.getElementById("selected");
const otherWidgetBlock = document.getElementById("widget-other-block");
const mainWidgetBlock = document.getElementById("widget-main-block");

let lat;
let lon;
let dt;
let localization;
let wetherCity;
let wetherInfo;
let date




const successCallback = (position) => {
  console.log(position);
};
const errorCallback = (error) => {
  console.log(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

const renderMain = (item) => {
  return `<div class="temperature">
    <p class="temperature__info">${item.list[0].temp.day}&#8451;</p>
    <span class="temerature__feel">Feels like ${item.list[0].feels_like.day}&#8451;</span>
</div>
<div class="general__info">
    <div class="weather__type">${item.list[0].weather[0].main}</div>
    <div class="localzation">${wetherCity[0].name}, ${wetherCity[0].country}</div>
</div>
<div class="wether__icon">
    <img src="https://openweathermap.org/img/wn/${item.list[0].weather[0].icon}@2x.png" alt="Wether Icon">
</div>`;
};

const renderOther = (item) => {
  return `<div class="widget__content_other-card">
    <span class="day">${date = new Date(item.dt).toDateString()}</span>
    <div class="short__weather_info">
        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="Wether Icon">
        <span class="weather__type">${item.weather[0].description}</span>
    </div>
    <div class="temperature__range">
        <span class="from">${item.temp.min}&#8451;</span>
        <span class="to">${item.temp.max}&#8451;</span>
    </div>
</div>`;
};

const main = () => {
  search.addEventListener("submit", (event) => {
    event.preventDefault();
    localization = searchValue.value;
    console.log(`Your localization is ${localization}`);
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${localization}&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        wetherCity = data;
        console.log(data);
        searchInfo.innerHTML = `Selected: ${localization}, ${data[0].name}, ${data[0].country} `;
        lat = data[0].lat;
        lon = data[0].lon;
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=metric&cnt=5&appid=${API_KEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            wetherInfo = data;
            console.log(data);
            mainWidgetBlock.innerHTML = renderMain(wetherInfo);
            otherWidgetBlock.innerHTML = wetherInfo.list.map(renderOther).join('')
          });
      });
  });
  
};


main();
