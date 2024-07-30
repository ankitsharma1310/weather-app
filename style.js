const apiKey = "2457052e660caf8a719156fc6adcad5b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        const weatherCondition = data.weather[0].main.toLowerCase();
        const iconUrl = getWeatherIcon(weatherCondition);

        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " km/h";
        weatherIcon.src = iconUrl;

    } catch (error) {
        alert('Error: ' + error.message);
        console.error('Error:', error);
    }
}

function getWeatherIcon(condition) {
    switch (condition) {
        case 'clear':
            return 'image/sunny.png';
        case 'clouds':
            return 'image/clouds.png';
        case 'rain':
            return 'image/rainy.webp';
        case 'drizzle':
            return 'image/rain.webp';
        case 'mist':
            return 'image/mist.webp';
        case 'snow':
            return 'image/snow.png';
        default:
            return 'image/sunny.png';
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchbox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

searchbox.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});
