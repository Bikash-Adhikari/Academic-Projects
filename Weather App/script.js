
document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('city-input');
  const getWeatherBtn = document.getElementById('get-weather-btn');
  const weatherInfo = document.getElementById('weather-info');
  const cityNameDisplay = document.getElementById('city-name');
  const temperatureDisplay = document.getElementById('temperature');
  const descriptionDisplay = document.getElementById('description');
  const errorMessage = document.getElementById('error-message');


  const API_KEY = "417eab2d0848bd3b0a0bf28eebbec9e6";


  getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {

      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);

    } catch (error) {
      showError();

    }

    cityInput.value = "";

  })








  async function fetchWeatherData(city) {

    //1.gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url); // [Respnse = 'error' or 'Ok']

    //2.if throw error
    if (!response.ok) {
      throw new Error("City not found !")
    }

    //3.if not error [ok]
    const data = await response.json();
    return data;
  }







  function displayWeatherData(data) {
    //display

    console.log(data);

    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp} °C`
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`


    //unlock the display
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  }








  function showError() {
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden')
  }


})