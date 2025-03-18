// API Key and Base URL for the weather API (replace 'YOUR_API_KEY' with your actual API key)
const API_KEY = '7400897b8fea433a8d3694276b38c0b4'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/onecall';

// Get references to the DOM elements
const cityInput = document.getElementById('cityname');
const searchBtn = document.getElementById('search-btn');
const weatherCards = document.querySelectorAll('.card');
const weeklyForecastContainer = document.querySelector('.newlyforecast');
const notFoundMessage = document.querySelector('.notfound');
const weatherForecastSection = document.querySelector('.weatherforecast1');

// Function to fetch current weather based on city name
async function fetchWeather(city) {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayCurrentWeather(data);
        fetchWeeklyForecast(data.coord.lat, data.coord.lon);
    } catch (error) {
        console.error(error);
        notFoundMessage.style.display = 'block';
        weatherForecastSection.style.display = 'none';
    }
}

// Function to display current weather information
function displayCurrentWeather(data) {
    // Update the current weather cards for each city
    weatherCards.forEach((card, index) => {
        const cityNames = ['New York City', 'Los Angeles', 'London']; // Replace with actual city names as needed
        if (data.name === cityNames[index]) {
            card.querySelector('.city').textContent = data.name;
            card.querySelector('.degree').textContent = `${Math.round(data.main.temp)}°`;
            card.querySelector('.sec11 .strong').textContent = `${Math.round(data.main.feels_like)}°`;
            card.querySelector('.sec11 .humidity p:nth-child(2)').textContent = `${data.main.humidity}%`;
            card.querySelector('.sec11 .wind .strong').textContent = `${data.wind.speed} mph`;
            card.style.display = 'block'; // Show the card
        }
    });

    // Show the weather forecast section
    weatherForecastSection.style.display = 'block';
    notFoundMessage.style.display = 'none';
}

// Function to fetch the 7-day weather forecast
async function fetchWeeklyForecast(lat, lon) {
    try {
        const response = await fetch(`${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayWeeklyForecast(data.daily);
    } catch (error) {
        console.error(error);
    }
}

// Function to display the weekly forecast data
function displayWeeklyForecast(forecast) {
    // Clear existing forecast items
    weeklyForecastContainer.innerHTML = '';

    // Display the forecast for the next 7 days
    forecast.forEach((day, index) => {
        // Create a new forecast item
        const forecastItem = document.createElement('div');
        forecastItem.className = 'div' + (index + 1) + ' days forecastitem';
        forecastItem.innerHTML = `
            <p class="forecastitemdata regulartext">${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <p><img class="sun${index + 1} forecastitemimg" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt=""></p>
            <p class="forecastitemtemp">${Math.round(day.temp.day)}°</p>
        `;
        weeklyForecastContainer.appendChild(forecastItem);
    });
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name or zip code');
    }
});