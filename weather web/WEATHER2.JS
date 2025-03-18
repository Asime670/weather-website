const apikey = '7400897b8fea433a8d3694276b38c0b4';
const apiurl = 'https://api.openweathermap.org/data/2.5/weather';
const forecasturl = 'https://api.openweathermap.org/data/2.5/onecall';
const apiurlweekly = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&";

async function getWeather(city) {
    try {
        const response = await fetch(`${apiurl && apiurlweekly}?q=${city}&appid=${apikey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data: ' + error.message);
    }
}

function displayWeather(data) {
    const city = data.name;
    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const wind = data.wind.speed;
    const humidity = data.main.humidity;

    document.querySelector('.card1 .city').textContent = city;
    document.querySelector('.card1 .degree').innerHTML = `${temp}°C <span><img class="rain" src="pics/Photoroom-20250307_190813.png" alt=""></span>`;
    document.querySelector('.card1 .feelslike .strong').textContent = `${feelsLike}°C`;
    document.querySelector('.card1 .humidity p:nth-child(2)').textContent = `${humidity}%`;
    document.querySelector('.card1 .wind .strong').textContent = `${wind} mph`;
}

document.getElementById('search-btn').addEventListener('click', () => {
    const cityInput = document.getElementById('cityname').value;
    if (cityInput) {
        getWeather(cityInput);
    } else {
        alert('Please enter a city name or zip code');
    }
});

async function getWeeklyForecast(lat, lon) {
    try {
        const response = await fetch(`${apiurl}?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`);
        if (!response.ok) {
            throw new Error('Unable to fetch forecast data');
        }
        const data = await response.json();
        displayWeeklyForecast(data.daily);
    } catch (error) {
        console.error(error);
        alert('Error fetching forecast data: ' + error.message);
    }
}

function displayWeeklyForecast(forecast) {
    const forecastContainer = document.querySelector('.weatherforecast');

    // Clear existing content
    forecastContainer.innerHTML = '<p class="week1">Weekly Forecast</p><p class="nyc">New York City - 7 Day Forecast</p>';

    forecast.forEach((day, index) => {
        const dayDiv = document.createElement('div');
        dayDiv.className = `div${index + 1}`;
        dayDiv.innerHTML = `
            <p>${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <p><img class="sun${index + 1}" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt=""></p>
            <p>${Math.round(day.temp.day)}°</p>
        `;
        forecastContainer.appendChild(dayDiv);
    });
}
// Example usage: Get forecast for New York City (latitude and longitude)
const nycLat = 40.7128;
const nycLon = -74.0060;
getWeeklyForecast(nycLat, nycLon);











async function getCurrentWeather(city) {
    try {
        const response = await fetch(`${apiurl}?q=${city}&appid=${apikey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayCurrentWeather(data);
        getWeeklyForecast(data.coord.lat, data.coord.lon);
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data: ' + error.message);
    }
}

async function getWeeklyForecast(lat, lon) {
    try {
        const response = await fetch(`${forecasturl}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('Unable to fetch forecast data');
        }
        const data = await response.json();
        displayWeeklyForecast(data.daily);
    } catch (error) {
        console.error(error);
        alert('Error fetching forecast data: ' + error.message);
    }
}

function displayCurrentWeather(data) {
    document.querySelector('.card1 .city').textContent = data.name;
    document.querySelector('.card1 .degree').innerHTML = `${Math.round(data.main.temp)}°C <span><img class="rain" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""></span>`;
    document.querySelector('.card1 .feelslike .strong').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.querySelector('.card1 .humidity p:nth-child(2)').textContent = `${data.main.humidity}%`;
    document.querySelector('.card1 .wind .strong').textContent = `${data.wind.speed} mph`;
}

function displayWeeklyForecast(forecast) {
    const forecastContainer = document.querySelector('.weatherforecast');

    // Clear existing content
    forecastContainer.innerHTML = '<p class="week1">Weekly Forecast</p><p class="nyc">7 Day Forecast</p>';
    forecast.forEach((day, index) => {
        const dayDiv = document.createElement('div');
        dayDiv.className = `div${index + 1}`;
        dayDiv.innerHTML = `
            <p>${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <p><img class="sun${index + 1}" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt=""></p>
            <p>${Math.round(day.temp.day)}°</p>
        `;
        forecastContainer.appendChild(dayDiv);
    });
}

// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', () => {
    const cityInput = document.getElementById('cityname').value.trim();
    if (cityInput) {
        getCurrentWeather(cityInput);
    } else {
        alert('Please enter a city name or zip code');
    }
});
























// const cityinput = document.querySelector('.cityinput');
// const searchbtn = document.querySelector('.searchbtn');
// const notfoundsection = document.querySelector('.notfound');
// const weatherinforsection = document.querySelector('.weatherinfor');
// const searchcitysection = document.querySelector('.searchcity');
// const countrytext = document.querySelector('.countrytext');
// const temptext = document.querySelector('.temptext');
// const conditionaltext = document.querySelector('.conditionaltext');
// const hunidityvaluetext = document.querySelector('.hunidityvaluetext');
// const windvaluetext = document.querySelector('.windvaluetext');
// const weathersummaryimg = document.querySelector('.weathersummaryimg');
// const currendatatext = document.querySelector('.currendatatext');
// const forecastitemscontainer = document.querySelector('.forecastitemscontainer');

// searchbtn.addEventListener('click', () => {
//     if(cityinput.value.trim() != ''){
//         updateWeatherInfor(cityinput.value)
//         cityinput.value = '';
//         cityinput.blur();
//     }
// })
// cityinput.addEventListener('keydown', (event) => {
//     if (event.key == 'Enter' && cityinput.value.trim() != '') {
//         updateWeatherInfor(cityinput.value)
//         cityinput.value = '';
//         cityinput.blur();
//     }
// })
// async function getFetchData(endPoint, city){
//     const apiurl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apikey}&units=metric`;
//     const response = await fetch(apiurl)
//     return response.json()
// }
// function getWeatherIcon(id){
//     if(id <= 232) return 'clouds.png';
//     if(id <= 321) return 'dizzle.png';
//     if(id <= 531) return 'rain.png';
//     if(id <= 622) return 'snow.png';
//     if(id <= 781) return 'mist.png';
//     if(id <= 800) return 'clear.png';
//     else return 'clouds.png';
// }

// function getCurrentData(){
//     const currentData = new Data();
//     const options = {
//         weekday: 'short',
//         day: '2-digit',
//         month: 'short'
//     }
//     return currentData.toLocaleDateString('en-GB', options)
// }

// async function updateWeatherInfor(city) {
//     const weatherData = await getFetchData('weather', city);
//     if (weatherData.cod != 200) {
//         showDisplaySection(notfoundsection);
//         return;
//     }
//     // console.log(weatherData)
//     const{
//         name: country,
//         main: { temp, humidity },
//         weather: [{ id, main }],
//         wind: { speed }
//     } = weatherData;

//     countrytext.textContent = country;
//     temptext.textContent = Math.round(temp) + '°C';
//     conditionaltext.textContent = main;
//     hunidityvaluetext.textContent = humidity + '%';
//     windvaluetext.textContent = speed + ' M/s';

//     currendatatext.textContent = getCurrentData();
//     weathersummaryimg.scr = `images/${getWeatherIcon(id)}`;

//     await updateForecastInfor(city);
//     showDisplaySection(weatherinforsection)
// }
// async function updateForecastInfor(city){
//     const forecastsData = await getFetchData(forecast, city);
//     const timetaken = '12:00:00';
//     const todaydate = new Date().toISOString().split('T')[0];

//     forecastitemscontainer.innerHTML = ''
//     forecastsData.list.forEach(forecastWeather => {
//         if(forecastWeather.dt_txt.includes(timetaken) && !forecastWeather.dt_txt.includes(todaydate)){
//             updateForecastItems(forecastWeather)
//         }
//     })
// }

// function updateForecastItems(weatherData) {
//     console.log(weatherData);
//     const{
//         dt_txt: date,
//         weather: [{ id }],
//         main: { temp }
//     } = weatherData

//     const datetaken = new Date(date);
//     const dateoption = {
//         day: '2-digit',
//         month: 'short'
//     }
//     const dateresult = datetaken.toLocaleDateString('en-US', dateoption)

//     const forecastItem = `
//         <div class="forecastitem">
//             <h5 class="forecastitemdata regulartext">${dateresult}</h5>
//             <img src="images/${getWeatherIcon(id)}" alt="" class="forecastitemimg">
//             <h5 class="forecastitemtemp">${Math.round(temp)}°C</h5>
//         </div>
//     `
//     forecastitemscontainer.insertAdjacentHTML('beforeend', forecastItem)
// }
// function showDisplaySection(section){
//     [weatherinforsection, searchcitysection, notfoundsection].forEach(section => section.style.disply = 'none') = section.style.disply = 'flex'
// }









// API Key and Base URL for the weather API (replace 'YOUR_API_KEY' with your actual API key)
// const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/onecall';

// Get references to the DOM elements
const cityInput = document.querySelector('.cityinput');
const searchBtn = document.querySelector('.searchbtn');
const weatherInfo = document.querySelector('.weatherinfor');
const notFoundMessage = document.querySelector('.notfound');
const locationText = document.querySelector('.countrytext');
const currentDateText = document.querySelector('.currendatatext');
const tempText = document.querySelector('.temptext');
const conditionText = document.querySelector('.conditionaltext');
const humidityText = document.querySelector('.hunidityvaluetext');
const windText = document.querySelector('.windvaluetext');
const forecastContainer = document.querySelector('.forecastitemscontainer');

// Function to fetch current weather based on city name
async function fetchWeather(city) {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error(error);
        notFoundMessage.style.display = 'block';
        weatherInfo.style.display = 'none';
    }
}

// Function to display weather information
function displayWeather(data) {
    // Update weather info based on the fetched data
    locationText.textContent = data.name;
    currentDateText.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    tempText.textContent = `${Math.round(data.main.temp)}°C`;
    conditionText.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    humidityText.textContent = `${data.main.humidity}%`;
    windText.textContent = `${data.wind.speed} m/s`;
    
    // Fetch the 7-day forecast using coordinates
    const { lat, lon } = data.coord;
    fetchForecast(lat, lon);
}

// Function to fetch 7-day weather forecast
async function fetchForecast(lat, lon) {
    try {
        const response = await fetch(`${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayForecast(data.daily);
    } catch (error) {
        console.error(error);
    }
}

// Function to display the 7-day weather forecast
function displayForecast(forecast) {
    // Clear previous forecast items
    forecastContainer.innerHTML = '';

    // Display the forecast for the next 4 days (can adjust as needed)
    for (let i = 1; i <= 4; i++) {
        const day = forecast[i];
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecastitem';
        forecastItem.innerHTML = `
            <h5 class="forecastitemdata regulartext">${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</h5>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="" class="forecastitemimg">
            <h5 class="forecastitemtemp">${Math.round(day.temp.day)}°C</h5>
        `;
        forecastContainer.appendChild(forecastItem);
    }

    // Show the weather information and hide the not found message
    weatherInfo.style.display = 'block';
    notFoundMessage.style.display = 'none';
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});