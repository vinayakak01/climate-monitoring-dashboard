// Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
const apiKey = '4076517be222114e8f6525f96943ad98';

function addCity() {
  const cityInput = document.getElementById('cityInput');
  const cityName = cityInput.value;

  // Clear input field
  cityInput.value = '';

  // Fetch weather data
  fetchWeatherData(cityName);
}

async function fetchWeatherData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Display weather data
    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function displayWeather(data) {
  const weatherContainer = document.getElementById('weather-container');

  // Create a card for the city
  const card = document.createElement('div');
  card.classList.add('weather-card');

  // Display city name
  const cityName = document.createElement('h2');
  cityName.textContent = data.name;
  card.appendChild(cityName);

  // Display weather details
  const weatherDetails = document.createElement('p');
  weatherDetails.textContent = `Temperature: ${data.main.temp}°C, Description: ${data.weather[0].description}`;
  card.appendChild(weatherDetails);

  // Append the card to the container
  weatherContainer.appendChild(card);
}
