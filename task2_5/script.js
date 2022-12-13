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
let date;
let geoLat;
let geoLon;

const renderMain = (item) => {
  return `<div class="temperature">
    <p class="temperature__info">${item.list[0].temp.day}&#8451;</p>
    <span class="temerature__feel">Feels like ${item.list[0].feels_like.day}&#8451;</span>
</div>
<div class="general__info">
    <div class="weather__type">${item.list[0].weather[0].main}</div>
    <div class="localzation">${item.city.name}, ${item.city.country}</div>
</div>
<div class="wether__icon">
    <img src="https://openweathermap.org/img/wn/${item.list[0].weather[0].icon}@2x.png" alt="Wether Icon">
</div>`;
};

const renderOther = (item) => {
  return `<div class="widget__content_other-card">
    <span class="day">${(date = new Date(item.dt*1000)
      .toDateString()
      .split(" ")[0])}</span>
    <div class="short__weather_info">
        <img src="https://openweathermap.org/img/wn/${
          item.weather[0].icon
        }@2x.png" alt="Wether Icon">
        <span class="weather__type">${item.weather[0].description}</span>
    </div>
    <div class="temperature__range">
        <span class="from">${item.temp.min}&#8451;</span>
        <span class="to">${item.temp.max}&#8451;</span>
    </div>
</div>`;
};
const startedWidget = () => {
  const successCallback = (position) => {
    geoLat = position.coords.latitude;
    geoLon = position.coords.longitude;
    try {getApi(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${geoLat}&lon=${geoLon}&units=metric&cnt=7&appid=${API_KEY}`);}
    catch (e) {
        searchInfo.innerHTML = `${e}`
    }
    
  };
  const errorCallback = (error) => console.log(error)
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};
const main = () => {
  search.addEventListener("submit", (event) => {
    event.preventDefault();
    localization = searchValue.value;
    console.log(`Your localization is ${localization}`);
    try {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${localization}&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        searchInfo.innerHTML = `Selected: ${localization}, ${data[0].name}, ${data[0].country} `;
        lat = data[0].lat;
        lon = data[0].lon;
        getApi(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=metric&cnt=7&appid=${API_KEY}`
        );
      }).catch(e => searchInfo.innerHTML = `Incorrect city name`)} 
      catch (e) {
        searchInfo.innerHTML = `${e}`
      }
  });
};

const getApi = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((wetherInfo) => {
      mainWidgetBlock.innerHTML = renderMain(wetherInfo);
      otherWidgetBlock.innerHTML = wetherInfo.list.slice(1).map(renderOther).join("");
      searchInfo.innerHTML = `Selected: ${wetherInfo.city.name}, ${wetherInfo.city.country} `;
    });
};

startedWidget();
main();
