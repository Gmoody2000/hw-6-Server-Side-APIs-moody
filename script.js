const apiKey = '1d54bf81e0fe51f6cb0f1c30113c57aa'; 
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherSection = document.getElementById('current-weather');
const forecastSection = document.getElementById('forecast');
const searchHistorySection = document.getElementById('search-history');

const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

renderSearchHistory();

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cityName = cityInput.value;
  const weatherData = await getWeatherData(cityName);
  updateUI(weatherData);
});

async function getWeatherData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

function updateUI(weatherData) {
  currentWeatherSection.innerHTML = '...';
  forecastSection.innerHTML = '...';
  addToSearchHistory(cityInput.value);
  renderSearchHistory();
}

function addToSearchHistory(city) {
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
}

function renderSearchHistory() {
  searchHistorySection.innerHTML = '';
  searchHistory.forEach(city => {
    const historyItem = document.createElement('div');
    historyItem.textContent = city;
    historyItem.addEventListener('click', () => {
      cityInput.value = city;
      searchForm.dispatchEvent(new Event('submit'));
    });
    searchHistorySection.appendChild(historyItem);
  });
}
