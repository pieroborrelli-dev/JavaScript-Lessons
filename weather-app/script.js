'use strict'
const locationInfo = document.querySelector('#location')
const locationDescription = document.querySelector('.desc')
const celsiusTemperatureInfo = document.querySelector('.celsius')
const fahrenheitTemperatureInfo = document.querySelector('.fahrenheit')
const iconImg = document.getElementById('weather-icon')

const apiKey = '*******'
window.addEventListener('load', () => {
  if (navigator.geolocation) {
    // if the user has geolocation active
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      fetch(base)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          const location = data.name
          const description = data.weather[0].description
          const celsiusTemperature = data.main.temp
          const icon = data.weather[0].icon
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

          locationInfo.textContent = location
          locationDescription.textContent = description
          celsiusTemperatureInfo.textContent = `${celsiusTemperature.toFixed(
            2
          )}°C`

          const fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32
          fahrenheitTemperatureInfo.textContent = `${fahrenheitTemperature.toFixed(
            2
          )}°F`
          iconImg.src = iconUrl // async
        })
    })
  }
})
