// OpenWeatherMap API Key
let apiKey = '9a2c29bf294e19427dd4c9a1b2f9cbfb';

let useCelsius = true; // To toggle temperature unit

// Getting all necessary elements from the page
let searchBtn = document.querySelector(".button button");
let useLocationBtn = document.querySelectorAll(".button button")[1];
let cityInput = document.getElementById("cityName");
let todayEl = document.getElementById("today");
let allDaysEl = document.getElementById("allDays");
let forecastContainer = document.querySelector(".forecast");
let todayHeading = document.getElementById("today");
let foreEl = document.getElementById("fore");

// Create a toggle button for switching temperature units
let toggleBtn = document.createElement("button");
toggleBtn.textContent = "Switch to °F";
toggleBtn.className = "bg-[#867689] text-white px-3 py-2 rounded mt-4";
toggleBtn.onclick = function () {
    useCelsius = !useCelsius;
    if (useCelsius === true) {
        toggleBtn.textContent = "Switch to °F";
    } else {
        toggleBtn.textContent = "Switch to °C";
    }
    let city = cityInput.value.trim();
    if (city !== "") {
        fetchWeather(city);
    }
};

let inputContainer = document.querySelector(".input");
inputContainer.appendChild(toggleBtn);

// Convert Kelvin to Celsius or Fahrenheit
function formatTemp(kelvin) {
    let temperature;
    if (useCelsius === true) {
        temperature = (kelvin - 273.15).toFixed(1) + " °C";
    } else {
        temperature = (((kelvin - 273.15) * 9 / 5) + 32).toFixed(1) + " °F";
    }
    return temperature;
}

// Show today's weather
function createCurrentCard(data, city) {
    todayHeading.style.display = "block";
    foreEl.style.display = "none";

    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let wind = data.wind.speed;
    let icon = data.weather[0].icon;
    let iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    let cardHTML =
        '<div class="flex justify-between items-center bg-[#dcdcdc] shadow-md rounded-xl p-4 pl-3 mt-4 w-[800px]">' +
        '<div>' +
        '<h2 class="text-2xl font-semibold">' + city + '</h2>' +
        '<p class="mt-2 tracking-wider">Temperature : ' + formatTemp(temp) + '</p>' +
        '<p class="mt-2 tracking-wider">Wind : ' + wind + ' m/s</p>' +
        '<p class="mt-2 tracking-wider">Humidity : ' + humidity + '%</p>' +
        '</div>' +
        '<img src="' + iconURL + '" alt="Weather icon" class="w-[80px] h-[80px]">' +
        '</div>';

    todayEl.insertAdjacentHTML("afterend", cardHTML);
}

// Show 4-day forecast
function createForecastCards(data) {
    let forecastCardsContainer = document.getElementById("forecastCardsContainer");
    allDaysEl.style.display = "block";
    foreEl.style.display = "none";

    forecastCardsContainer.innerHTML = "";

    let html = '<div class="flex flex-col">';
    html += '<h1 class="text-[24px] font-lighter mt-6 mb-2">4-Day Forecast</h1>';
    html += '<div class="flex flex gap-4 mt-4">';

    let i = 8;
    while (i <= 32) {
        let day = data.list[i];
        let date = new Date(day.dt * 1000).toLocaleDateString();
        let icon = day.weather[0].icon;
        let temp = formatTemp(day.main.temp);
        let wind = day.wind.speed;
        let humidity = day.main.humidity;

        html +=
            '<div class="flex flex-col items-center bg-white shadow-md rounded-xl p-4 w-[200px]">' +
            '<p class="font-semibold">' + date + '</p>' +
            '<img src="https://openweathermap.org/img/wn/' + icon + '@2x.png" class="w-[60px] h-[60px]" />' +
            '<p>Temp: ' + temp + '</p>' +
            '<p>Wind: ' + wind + ' m/s</p>' +
            '<p>Humidity: ' + humidity + '%</p>' +
            '</div>';

        i = i + 8;
    }

    html += '</div></div>';
    forecastCardsContainer.innerHTML = html;
}

// Fetch and display weather data
function fetchWeather(city) {
    if (todayEl.nextElementSibling) {
        todayEl.nextElementSibling.remove();
    }
    if (allDaysEl.nextElementSibling) {
        allDaysEl.nextElementSibling.remove();
    }

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey)
        .then(function (res) {
            return res.json();
        })
        .then(function (currentData) {
            if (currentData.cod !== 200) {
                throw new Error("City not found");
            }
            createCurrentCard(currentData, city);
            return fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey);
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (forecastData) {
            createForecastCards(forecastData);
        });

    storeCity(city);
}

// Store city search history
function storeCity(city) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    if (history.includes(city) === false) {
        history.unshift(city);
        if (history.length > 5) {
            history.pop();
        }
        localStorage.setItem("history", JSON.stringify(history));
        renderHistory();
    }
}

// Display the list of previously searched cities
function renderHistory() {
    let existing = document.getElementById("history");
    if (existing) {
        existing.remove();
    }

    let history = JSON.parse(localStorage.getItem("history")) || [];
    let container = document.createElement("div");
    container.id = "history";
    container.className = "mt-5";

    for (let i = 0; i < history.length; i++) {
        let btn = document.createElement("button");
        btn.className = "block bg-[#dcdcdc] text-black px-3 py-2 mt-2 w-[300px] text-left rounded hover:bg-[#bbbbbb]";
        btn.textContent = history[i];
        btn.onclick = function () {
            fetchWeather(history[i]);
        };
        container.appendChild(btn);
    }

    document.querySelector(".input").appendChild(container);
}

// When search button is clicked
searchBtn.addEventListener("click", function () {
    let city = cityInput.value.trim();
    if (city !== "") {
        fetchWeather(city);
    }
});

// Load search history when the page loads
window.onload = renderHistory;



















































































































































/*

// Your OpenWeatherMap API key
let apiKey = '9a2c29bf294e19427dd4c9a1b2f9cbfb';

let useCelsius = true; // Toggle state

let searchBtn = document.querySelector(".button button");
let useLocationBtn = document.querySelectorAll(".button button")[1];
let cityInput = document.getElementById("cityName");
let todayEl = document.getElementById("today");
let allDaysEl = document.getElementById("allDays");
let forecastContainer = document.querySelector(".forecast");
let todayHeading = document.getElementById("today");
let foreEl = document.getElementById("fore");

// Toggle button
let toggleBtn = document.createElement("button");
toggleBtn.textContent = "Switch to °F";
toggleBtn.className = "bg-[#867689] text-white px-3 py-2 rounded mt-4";
toggleBtn.onclick = () => {
    useCelsius = !useCelsius;
    toggleBtn.textContent = useCelsius ? "Switch to °F" : "Switch to °C";
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
};
document.querySelector(".input").appendChild(toggleBtn);

// Utility to convert temperature
function formatTemp(kelvin) {
    return useCelsius
        ? `${(kelvin - 273.15).toFixed(1)} °C`
        : `${((kelvin - 273.15) * 9/5 + 32).toFixed(1)} °F`;
}

function createCurrentCard(data, city) {
    todayHeading.style.display = "block";
    foreEl.style.display = "none";
    let { temp, humidity } = data.main;
    let wind = data.wind.speed;
    let icon = data.weather[0].icon;
    let iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    let cardHTML = `
    <div class="flex justify-between items-center bg-[#dcdcdc] shadow-md rounded-xl p-4 pl-3 mt-4 w-[800px]">
        <div>
            <h2 class="text-2xl font-semibold">${city}</h2>
            <p class="mt-2 tracking-wider">Temperature : ${formatTemp(temp)}</p>
            <p class="mt-2 tracking-wider">Wind : ${wind} m/s</p>
            <p class="mt-2 tracking-wider">Humidity : ${humidity}%</p>
        </div>
        <img src="${iconURL}" alt="Weather icon" class="w-[80px] h-[80px]">
    </div>
    `;
    todayEl.insertAdjacentHTML("afterend", cardHTML);
}

function createForecastCards(data) {
    let forecastCardsContainer = document.getElementById("forecastCardsContainer");

    allDaysEl.style.display = "block";
    foreEl.style.display = "none";

    forecastCardsContainer.innerHTML = ""; // Clear old content

    let html = `
        <div class="flex flex-col">
            <h1 class="text-[24px] font-lighter mt-6 mb-2">4-Day Forecast</h1>
            <div class="flex flex gap-4 mt-4">
    `;

    for (let i = 8; i <= 32; i += 8) {
        let day = data.list[i];
        let date = new Date(day.dt * 1000).toLocaleDateString();
        let icon = day.weather[0].icon;
        let temp = formatTemp(day.main.temp);
        let wind = day.wind.speed;
        let humidity = day.main.humidity;

        html += `
        <div class="flex flex-col items-center bg-white shadow-md rounded-xl p-4 w-[200px]">
            <p class="font-semibold">${date}</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" class="w-[60px] h-[60px]" />
            <p>Temp: ${temp}</p>
            <p>Wind: ${wind} m/s</p>
            <p>Humidity: ${humidity}%</p>
        </div>
        `;
    }

    html += `</div>`;
    forecastCardsContainer.innerHTML = html;  
}

function fetchWeather(city) {
    todayEl.nextElementSibling?.remove();
    allDaysEl.nextElementSibling?.remove();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(res => res.json())
        .then(currentData => {
            if (currentData.cod !== 200) throw new Error("City not found");
            createCurrentCard(currentData, city);
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
        })
        .then(res => res.json())
        .then(forecastData => createForecastCards(forecastData))
        

    storeCity(city);
}

function storeCity(city) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    if (!history.includes(city)) {
        history.unshift(city);
        if (history.length > 5) history.pop();
        localStorage.setItem("history", JSON.stringify(history));
        renderHistory();
    }
}

function renderHistory() {
    let existing = document.getElementById("history");
    if (existing) existing.remove();

    let history = JSON.parse(localStorage.getItem("history")) || [];
    let container = document.createElement("div");
    container.id = "history";
    container.className = "mt-5";

    history.forEach(city => {
        let btn = document.createElement("button");
        btn.className = "block bg-[#dcdcdc] text-black px-3 py-2 mt-2 w-[300px] text-left rounded hover:bg-[#bbbbbb]";
        btn.textContent = city;
        btn.onclick = () => fetchWeather(city);
        container.appendChild(btn);
    });

    document.querySelector(".input").appendChild(container);
}

searchBtn.addEventListener("click", () => {
    let city = cityInput.value.trim();
    if (city) fetchWeather(city);
});

window.onload = renderHistory;
*/