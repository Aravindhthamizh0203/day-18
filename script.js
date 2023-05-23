document.addEventListener('DOMContentLoaded', function () {
    // Fetch country data
    fetch('https://restcountries.com/v3.1/name/india')
        .then(response => response.json())
        .then(data => {
            // Extract necessary information
            const country = data[0];
            const capital = country.capital[0];
            const region = country.region;
            const latlng = country.latlng;
            const flag = country.flags.svg;
            const countryCode = country.cca2;

            // Display country information
            document.getElementById('country-name').textContent = country.name.common;
            document.getElementById('country-region').textContent = region;
            document.getElementById('country-capital').textContent = capital;
            document.getElementById('country-latlng').textContent = latlng.join(', ');
            document.getElementById('country-code').textContent = countryCode;
            document.getElementById('country-flag').src = flag;

            // Fetch weather data
            const apiKey = '08388a50f641356b2826d5a125062589';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(weatherData => {
                    // Extract necessary weather information
                    const temperature = weatherData.main.temp;
                    const humidity = weatherData.main.humidity;
                    const weatherDescription = weatherData.weather[0].description;

                    // Display weather information
                    document.getElementById('country-weather').textContent = weatherDescription;
                    document.getElementById('country-temperature').textContent = temperature;
                    document.getElementById('country-humidity').textContent = humidity;
                })
                .catch(error => console.log('Failed to fetch weather data:', error));
        })
        .catch(error => console.log('Failed to fetch country data:', error));
});
