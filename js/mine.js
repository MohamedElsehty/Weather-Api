// Dom 
let inputSearch = document.getElementById("search");
//======= Current day  ========
let currentDayNameOutput = document.querySelector(".current-day span.day");  // span
let currentDateAndMonth = document.querySelector(".current-day span.date"); //  span
let locationOutput = document.querySelector(".current-day .location");  // span
let currentDayTemp = document.querySelector(".current-day .temperature"); //  h2
let currentDayIcon = document.querySelector(".current-day .status-icon"); //  <img>
let currentDayStatus = document.querySelector(".current-day .status-title"); //  <p>
let currentDayRain = document.querySelector(".current-day .percentage");
let currentDayWindSpeed = document.querySelector(".current-day .wind-speed");
let currentDaydirection = document.querySelector(".current-day .compass");
//========== the Nextday ========
let nextDayOutput = document.querySelector(".tomorrow span.day");
let nextDayIcon = document.querySelector(".tomorrow .status-icon"); //  <img>
let nextDayMaxTemp = document.querySelector(".tomorrow .max-temperature");
let nextDayMinTemp = document.querySelector(".tomorrow .min-temperature");
let nextDayStatus = document.querySelector(".tomorrow .status-title");
//==========  the After-Tomorrow ========
let afterTomorrowDayOutput = document.querySelector(".after-tomorrow span.day");
let afterTomorrowDayIcon = document.querySelector(".after-tomorrow .status-icon"); //  <img>
let afterTomorrowDayMaxTemp = document.querySelector(".after-tomorrow .max-temperature");
let afterTomorrowDayMinTemp = document.querySelector(".after-tomorrow .min-temperature");
let afterTomorrowDayStatus = document.querySelector(".after-tomorrow .status-title");


inputSearch.addEventListener('keyup', getData);
fetchData();
// declering the api function
function fetchData(location = "shebin-elkom")
{
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=2927f235b1af4edaac8141951221310&q=${location}&days=3`)
    .then(res => res.json())
        .then(data => {
            console.log(data);
            displayWeather(data);
        });

};

function displayWeather(data) {
    
    let options = { weekday: 'long', month: 'long', day: 'numeric' }; //## config object ##
    // console.log(today.toLocaleDateString("en-US", options)) // return (Tuesday, October 11) as string
    let currentFullDate = data.forecast.forecastday[0].date; // return format such as (2022-10-11)
    let today = new Date(currentFullDate);
    let currDayName = today.toLocaleDateString("en-US", options).split(",")[0]; // return (Teusday)
    let currDateAndMonth = today.toLocaleDateString("en-US", options).split(",")[1].split(" ").reverse().join(" "); // return (11 October)

    currentDayNameOutput.innerHTML = `${currDayName}`;
    currentDateAndMonth.innerHTML = `${currDateAndMonth}`;
    locationOutput.innerHTML = `${data.location.name} <br /> "${data.location.country}"`;
    currentDayTemp.innerHTML = `${data.current.temp_c} <sup>o</sup>C`;
    currentDayIcon.src = `${data.current.condition.icon} `;
    currentDayStatus.innerHTML = `${data.current.condition.text} `;
    currentDayWindSpeed.innerHTML = `${data.current.wind_kph} kph`;
    currentDaydirection.innerHTML = `${data.current.wind_dir} `;
    currentDayRain.innerHTML = `${data.forecast.forecastday[0].day.daily_chance_of_rain}% `
    //==========>> for the forecast of the Next day <<========
    let tomorrowFullDate = data.forecast.forecastday[1].date;
    let tomorrow = new Date(tomorrowFullDate);
    let tomoDayName = tomorrow.toLocaleDateString("en-US", options).split(",")[0];

    nextDayOutput.innerHTML = `${tomoDayName}`;
    nextDayIcon.src = `${data.forecast.forecastday[1].day.condition.icon} `;
    nextDayMaxTemp.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c} <sup>o</sup>C`;
    nextDayMinTemp.innerHTML = `${data.forecast.forecastday[1].day.mintemp_c} <sup>o</sup>C`;
    nextDayStatus.innerHTML = `${data.forecast.forecastday[1].day.condition.text} `;
    //==========>> for the forecast of After-Next day <<========
    //############# to change the Date Format ##########
    let afterTomoFullDate = data.forecast.forecastday[2].date;
    let afterTomorrow = new Date(afterTomoFullDate);
    let aftrTomoDayName = afterTomorrow.toLocaleDateString("en-US", options).split(",")[0];

    afterTomorrowDayOutput.innerHTML = `${aftrTomoDayName}`;
    afterTomorrowDayIcon.src = `${data.forecast.forecastday[2].day.condition.icon} `;
    afterTomorrowDayMaxTemp.innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c} <sup>o</sup>C`;
    afterTomorrowDayMinTemp.innerHTML = `${data.forecast.forecastday[2].day.mintemp_c} <sup>o</sup>C`;
    afterTomorrowDayStatus.innerHTML = `${data.forecast.forecastday[2].day.condition.text} `
};
// getting search location to fetch data
function getData(event) {
    event.preventDefault();
    let searchValue = event.target.value;
    if (searchValue.length >= 3) {
        fetchData(searchValue);
    } else {
        fetchData();
    };
};
