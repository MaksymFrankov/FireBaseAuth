const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('weather-results');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = searchInput.value;
  const apiKey = '8f21c518411d30fb59eece5d06557a72';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('City not found');
      }
    })
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      resultsDiv.innerHTML = error.message;
    });
});

function displayWeatherData(data) {
  const cityName = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;

  resultsDiv.innerHTML = `
    <h2>${cityName}</h2>
    <p>Temperature: ${temperature}&deg;C</p>
    <p>Description: ${description}</p>
  `;
}